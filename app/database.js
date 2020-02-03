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
	search:require('./models/search.js')
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

db.generateTypeDefs=function(object,plural){
	let model=sequelize["modelManager"].getModel(object);
	if (!model) throw new Error("Could not find model "+object+", are you sure it exists?");

	let fields=Object.keys(model.tableAttributes)
		.filter(d=>['id','createdAt','updateAt'].indexOf(d)<0)
		.map(name=>{
			return Object.assign({},model.tableAttributes,{name});
		});

	let q=`extend type Query {
		${uc(object)}(id: ID!): ${uc(object)}
		all${uc(plural)}(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ${uc(object)}Filter): [${uc(object)}]
		_all${uc(plural)}Meta(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: ${uc(object)}Filter): ListMetadata
	}
	extend type Mutation {
		create${uc(object)}(
				${fields.map(d=>d.name+":String").join("\n\t\t")}
		):${uc(object)}
		update${uc(object)}(id:ID!,${fields.map(d=>d.name+":String").join(",")}):${uc(object)}
		delete${uc(object)}(id:ID!):${uc(object)}
	}
	type ${uc(object)} {
			id: ID!
			${fields.map(d=>d.name+":String").join("\n\t\t")}
	}

	input ${uc(object)}Filter {
			q: String
			id: ID
			ids: [ID]
			${fields.map(d=>d.name+":String").join("\n\t\t")}
	}`;
	return q;
};

db.generateGraphQLImpl=function(object,plural){
	return {
		Query: {
			[uc(object)]: async (obj, args, context, info) => db[object].findByPk(args.id),
			["all"+uc(plural)]: async (obj,{perPage=50,page=0,filter}) =>{
				let where={};
				if (filter.ids){
					where={id:filter.ids};
				}else{where=filter;};
				return db[object].findAll({where,limit:perPage,offset:page*perPage});
			},
			["_all"+uc(plural)+"Meta"]:async()=>{
				let count=await db[object].count();
				return {count};
			}
		},
		Mutation:{
			["create"+uc(object)]:async (obj, args, context, info) => db[object].create({values:args}),
			["update"+uc(object)]:async (obj, args, context, info) => {
				console.error(args);
				let count=await db[object].update(args,{where:{id:args.id}});
				return db[object].findByPk(args.id);
			},
			["remove"+uc(object)]:async (obj, args, context, info) => db[object].destroy({where:{id:args.id}})
		}
	};
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
