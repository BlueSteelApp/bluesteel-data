const {gql} = require('apollo-server-express');

const uc = (s) => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};

function generateTypeDefs(model,object,plural){
	if (!model) throw new Error("Could not find model "+object+", are you sure it exists?");

	let fields=Object.keys(model.tableAttributes)
		.filter(d=>['id','created_at','updated_at'].indexOf(d)<0)
		.map(name=>{
			return {name};
			// return Object.assign({},model.tableAttributes,{name});
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
	return gql(q);
}

function generateResolvers(model,object,plural){
	return {
		Query: {
			[uc(object)]: async (obj, args) => model.findByPk(args.id),
			["all"+uc(plural)]: async (obj,{perPage=50,page=0,filter}) =>{
				let where={};
				if(filter && filter.ids){
					where={id:filter.ids};
				} else{where=filter;}
				return model.findAll({where,limit:perPage,offset:page*perPage});
			},
			["_all"+uc(plural)+"Meta"]:async()=>{
				let count=await model.count();
				return {count};
			}
		},
		Mutation:{
			["create"+uc(object)]:async (obj, args) => model.create({values:args}),
			["update"+uc(object)]:async (obj, args) => {
				console.error(args);
				// let count=await db[object].update(args,{where:{id:args.id}});
				return model.findByPk(args.id);
			},
			["remove"+uc(object)]:async (obj, args) => model.destroy({where:{id:args.id}})
		}
	};
}

module.exports=function(options) {
	const {types}=options;
	if(!types||!types.length) throw new Error('types must be non empty array');
	const invalid = types.filter(x=>!x.model||!x.name||!x.plural);
	if(invalid.length) throw new Error('each type must have (model,name,plural) defined');

	const modules = types.map(({model,name,plural}) => {
		return {
			typeDefs: generateTypeDefs(model,name,plural),
			resolves: generateResolvers(model,name,plural)
		};
	});

	return modules;
}
