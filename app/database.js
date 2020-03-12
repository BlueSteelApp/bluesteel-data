const Sequelize = require('sequelize');
require('dotenv').config();

var db = {};

const sequelize = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USER,
	process.env.DATABASE_PASSWORD,
	{
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		dialect: 'mysql',
		define: {
			freezeTableName: true,
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		// <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
		operatorsAliases: false,
	//timestamps: false //If createdAt, modifiedAt are all available, we can use this
	},
);

let models = {
	person:require('./models/person.js'),
	segment:require('./models/segment.js'),
	address:require('./models/address.js'),
	query:require('./models/query.js')
};

// Initialize models
Object.values(models).forEach(model => {
	const seqModel = model(sequelize, Sequelize);
	db[seqModel.name] = seqModel;
});

// Apply associations
Object.keys(db).forEach(key => {
	if ('associate' in db[key]) {
		db[key].associate(db);
	}
});
const uc = (s) => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};

db.generateTypeDefs=function({name,graphQLType,graphQLPlural}){
	let model=sequelize["modelManager"].getModel(name);
	if (!model) throw new Error("Could not find model "+name+", are you sure it exists?");

	let fields=Object.keys(model.tableAttributes)
		.filter(d=>['id','createdAt','updateAt'].indexOf(d)<0)
		.map(name=>{
			return Object.assign({},model.tableAttributes,{name});
		});

	let q=`extend type Query {
		${uc(graphQLType)}(id: ID!): ${uc(graphQLType)}
		all${uc(graphQLPlural)}(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ${uc(graphQLType)}Filter): [${uc(graphQLType)}]
		_all${uc(graphQLPlural)}Meta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ${uc(graphQLType)}Filter): ListMetadata
	}
	extend type Mutation {
		create${uc(graphQLType)}(
				${fields.map(d=>d.name+":String").join("\n\t\t")}
		):${uc(graphQLType)}
		update${uc(graphQLType)}(id:ID!,${fields.map(d=>d.name+":String").join(",")}):${uc(graphQLType)}
		delete${uc(graphQLType)}(id:ID!):${uc(graphQLType)}
	}
	type ${uc(graphQLType)} {
			id: ID!
			${fields.map(d=>d.name+":String").join("\n\t\t")}
	}

	input ${uc(graphQLType)}Filter {
			q: String
			id: ID
			ids: [ID]
			${fields.map(d=>d.name+":String").join("\n\t\t")}
	}`;
	return q;
};

db.generateGraphQLImpl=function({name,graphQLType,graphQLPlural}){
	return {
		Query: {
			[uc(graphQLType)]: async (obj, args, context, info) => db[name].findByPk(args.id),
			["all"+uc(graphQLPlural)]: async (obj,{perPage=50,page=0,filter={}}) =>{
				let where={};
				if (filter.ids){
					where={id:filter.ids};
				}else{where=filter;};
				return db[name].findAll({where,limit:perPage,offset:page*perPage});
			},
			["_all"+uc(graphQLPlural)+"Meta"]:async()=>{
				let count=await db[name].count();
				return {count};
			}
		},
		Mutation:{
			["create"+uc(graphQLType)]:async (obj, args, context, info) => db[name].create({values:args}),
			["update"+uc(graphQLType)]:async (obj, args, context, info) => {
				console.error(args);
				let count=await db[name].update(args,{where:{id:args.id}});
				return db[name].findByPk(args.id);
			},
			["remove"+uc(graphQLType)]:async (obj, args, context, info) => db[name].destroy({where:{id:args.id}})
		}
	};
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
