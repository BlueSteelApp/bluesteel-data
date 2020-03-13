const DataLoader = require('dataloader');
const {gql} = require('apollo-server-express');

function Wrapper(options) {
	const{sqlWrapper}=options;
	if(!sqlWrapper) throw new Error('sqlWrapper required');
	this.sqlWrapper=sqlWrapper;
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

	const topLevelResolvers = {};
	const associationDefs = (associations||[]).map(a => {
		const targetName=a.name;
		const targetAssociation = model.associations[targetName];
		if(!targetAssociation) throw new Error('invalid - no sequelize association defined between '+name+' and '+targetName);
		const targetModel = sequelize.model(targetName);
		if(!targetModel) throw new Error('model with name '+targetName+' does not exist');
		const reverseAssociation = targetModel.associations[name];
		if(!reverseAssociation) {
			console.log(targetModel.associations);
			throw new Error('invalid - no reverse association defined from '+targetName+' to '+name);
		}

		let defs = [];
		const {identifierField} = targetAssociation;
		if(targetAssociation.isMultiAssociation) {
			defs.push(`
				extend type ${name} {
					${targetName}List: [${targetName}]
				}
			`);
			topLevelResolvers[name]={
				[targetName+'List']: ({id}) => {
					console.log('1Finding',targetName,'for',name);
					return targetModel.findAll({[identifierField]:id})
				}
			}
		} else {
			defs.push(`
				extend type ${name} {
					${targetName}: ${targetName}
				}
			`);
			topLevelResolvers[name]={
				[targetName]: async ({id}) => {
					console.log('2Finding',targetName,'for',name);
					const root = targetModel.findByPk(id);
					try {
						return await root['get'+targetName]();
					} catch(e) {
						console.error(e);
						throw e;
					}
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
					console.log('3Finding',name,'for',targetName,id);
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
					console.log('4Finding',targetName,'for',name);
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
		}
		return defs.join('\n');
	});
	const typeDefs=gql`
	type ${name} {
		id:ID!
		${Object.keys(fields).map(x=>`${x}:String`)}
		created_at: Date
		updated_at: Date
	}
	extend type Query {
		${name}(id:ID!): ${name}
	}
	${associationDefs}`;

	const fieldResolvers = {};
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
		},
		[name]: fieldResolvers
	};

	// console.log(associationDefs);
	console.log(topLevelResolvers);

	return {
		typeDefs, resolvers:Object.assign({},topLevelResolvers,resolvers),
		getDataLoader
	};
}

module.exports=Wrapper;
