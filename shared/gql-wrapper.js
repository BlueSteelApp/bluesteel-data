const DataLoader = require('dataloader');
const {gql} = require('apollo-server-express');

function Wrapper(options) {
	const{sqlWrapper}=options;
	if(!sqlWrapper) throw new Error('sqlWrapper required');
	this.sqlWrapper=sqlWrapper;
}

Wrapper.prototype.getSaveDefAndResolvers=function(type) {
	const {model,name,fields}=type;
	if(!model||!name)throw new Error('model and name required, got:'+JSON.stringify(type));

	const typeDefs=gql`
	input ${name}Save {
		id:ID
		${Object.entries(fields).map(([x,def])=>{
			const type = def.gqlType || 'String';
			return `${x}:${type}`
		})}
	}
	extend type Mutation {
		${name}Save(record:${name}Save!): ${name}
	}`;

	const resolvers={
		Mutation: {
			[`${name}Save`]: async (root,{record}) => {
				// update
				if(record.id) {
					const existing = await model.findByPk(record.id);
					if(!existing) throw new Error(`${name} does not exist`);
					Object.entries(record).forEach(([key,value]) => {
						existing[key]=value;
					});
					await existing.save();
					return existing;
				}
				const result = await model.create(record);
				return result;
			},
		},
	};
	return {
		typeDefs, resolvers,
	};
}

Wrapper.prototype.getModelDefsAndResolvers=function(type) {
	const {model,name,fields,associations}=type;
	const {sequelize}=this.sqlWrapper;

	if(!model||!name)throw new Error('model and name required, got:'+JSON.stringify(type));
	function getDataLoader(context) {
		if(!context) throw new Error('context must be passed to getDataLoader');
		context.cachedDataLoaders = context.cachedDataLoaders||{};
		if(context.cachedDataLoaders[name]) return context.cachedDataLoaders[name];
		context.cachedDataLoaders[name] = new DataLoader(async (ids) => {
			const bulk = await model.findAll({
				where: {id: ids}
			});
			const byId = {};
			bulk.forEach(x=>byId[x.id]=x);
			const results = ids.map(x=>byId[x]);
			return results;
		});
		return context.cachedDataLoaders[name];
	}

	const fieldResolvers = {};
	const topLevelResolvers = {};
	const associationDefs = (associations||[]).map(a => {
		const targetName=a.name;
		const targetAssociation = model.associations[targetName];
		if(!targetAssociation) {
			console.log(name,targetName,model.associations);
			throw new Error('invalid - no sequelize association defined between '+name+' and '+targetName);
		}
		const targetModel = sequelize.model(targetName);
		if(!targetModel) throw new Error('model with name '+targetName+' does not exist');
		const reverseAssociation = targetModel.associations[name];
		if(!reverseAssociation) {
			console.log(targetModel.associations);
			throw new Error('invalid - no reverse association defined from '+targetName+' to '+name);
		}

		let defs = [];
		if(targetAssociation.isMultiAssociation) {
			defs.push(`
				extend type ${name} {
					${targetName}List: [${targetName}]
				}
			`);
			fieldResolvers[targetName+'List'] = async ({id}) => {
				const root = await model.findByPk(id);try {
					const r = await root['get'+targetName]();
					return r;
				} catch(e) {
					console.error(e);
					throw e;
				}
			};
		} else {
			defs.push(`
				extend type ${name} {
					${targetName}: ${targetName}
				}
			`);
			fieldResolvers[targetName] = async ({id}) => {
				const root = await model.findByPk(id);
				try {
					const r = await root['get'+targetName]();
					return r;
				} catch(e) {
					console.error(e);
					throw e;
				}
			}
		}

		if(reverseAssociation.isMultiAssociation) {
			defs.push(`
				extend type ${targetName} {
					${name}List: [${name}]
				}
			`);
			topLevelResolvers[targetName]={
				[name+'List']: async ({id}) => {
					const root=await targetModel.findByPk(id);
					// const accessor=reverseAssociation.get;
					try {
						return await root['get'+name]();
					} catch(e) {
						console.error(e);
						throw e;
					}
				}
			}
		} else {
			defs.push(`
				extend type ${targetName} {
					${name}: ${name}
				}
			`);
			topLevelResolvers[targetName]={
				[name]: async ({id}) => {
					const root=await targetModel.findByPk(id);
					try {
						return await root['get'+name]();
					} catch(e) {
						console.error(e);
						throw e;
					}
				}
			}
		}
		return defs.join('\n');
	});
	const typeDefs=gql`
	type ${name} {
		id:ID!
		${Object.entries(fields).map(([x,def])=>{
			let type = def.gqlType || 'String';
			if(!def.allowNull) type+='!';
			return `${x}:${type}`;
		})}
		created_at: Date
		updated_at: Date
	}
	input ${name}Filter {
		ids:[ID]
		${Object.entries(fields).map(([x,def])=>{
			let type = def.gqlType || 'String';
			if(!def.allowNull) type+='!';
			return `${x}:${type}`;
		})}
		created_before: Date
		created_after: Date
		updated_before: Date
		updated_after: Date
	}
	extend type Query {
		${name}(id:ID!): ${name}
		${name}List(filter:${name}Filter,pageSize:Int,page:Int): [${name}]
	}
	${associationDefs}`;

	Object.keys(fields).forEach(x => {
		fieldResolvers[x] = async (root,args,context) => {
			if(root[x]) return root[x];
			const element = getDataLoader(context).load(root.id);
			if(!element) return null;
			return element[x];
		};
	});

	const resolvers={
		Query: {
			[name]: (root,{id},context) => getDataLoader(context).load(id),
			[name+"List"]: async (root,{filter,pageSize,page}) => {
				filter=filter||{};
				pageSize = pageSize || 50;
				page = page || 0;
				if(pageSize > 1000) throw new Error('pageSize limited to 1000');
				const where={}; const include=[];
				if(filter.ids) where.ids=filter.ids;
				else if(Object.keys(filter).length) {
					Object.keys(filter).forEach(key=>{
						where[key]=filter[key];
					});
				}
				return model.findAll({where,include,limit:pageSize,offset:pageSize*page});
			}},
		[name]: fieldResolvers
	};

	// console.log(associationDefs);
	// console.log(topLevelResolvers);
	// console.log(resolvers[name]);

	return {
		typeDefs, resolvers:Object.assign({},topLevelResolvers,resolvers),
		getDataLoader
	};
}

module.exports=Wrapper;
