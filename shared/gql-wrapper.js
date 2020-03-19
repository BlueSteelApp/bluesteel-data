const DataLoader = require('dataloader');
const {gql} = require('apollo-server-express');

function Wrapper(options) {
	const{sqlWrapper}=options;
	if(!sqlWrapper) throw new Error('sqlWrapper required');
	this.sqlWrapper=sqlWrapper;
}

function getGqlType({type,gqlType}) {
	if(gqlType) return gqlType;
	if(!type.key) throw new Error('Expected key on type:'+type);
	switch(type.key) {
		case'INTEGER':
		case'SMALLINT':
		case'MEDIUMINT':
		case'BIGINT':
			return 'Int';
		case'NUMBER':
		case'DECIMAL':
		case'DOUBLE':
			return 'Float';
		case'TIME':
		case'DATE':
		case'DATEONLY':
			return 'Date';
		case'BOOLEAN':
			return 'Boolean';
		case'JSON':
		case'JSONB':
			return 'JSON';
		default: return 'String';
	}
}

Wrapper.prototype.getSaveDefAndResolvers=function(type) {
	const{sqlWrapper}=this;
	const {model,name,fields, associations}=type;
	if(!model||!name)throw new Error('model and name required, got:'+JSON.stringify(type));

	const saveExtensions=[];
	(associations||[]).forEach(x => {
		if(x.createWith) {
			const target = sqlWrapper.getModel(x.name);
			const raw = target.associations[name];
			if(!raw) throw new Error('missing assocation');

			let addedType = `${name}Save`;
			if(raw.isMultiAssociation) addedType = `[${addedType}]`;

			saveExtensions.push(`
				extend input ${x.name}Save {
					${name}: ${addedType}
				}
			`);
		}
	});

	const typeDefs=gql`
	input ${name}Save {
		id:ID
		${Object.entries(fields).map(([x,def])=>{
			const type = getGqlType(def);
			return `${x}:${type}`
		})}
	}
	extend type Mutation {
		${name}Save(record:${name}Save!): ${name}
		${name}Delete(id:ID!): ${name}
	}

	${saveExtensions.join('\n')}
	`;

	const createAssociations = [];
	Object.entries(model.associations||{}).forEach(([target,raw]) => {
		createAssociations.push({
			name,
			target,
			targetKeyField: raw.targetKeyField,
			foreignKeyField: raw.foreignKeyField,
			sourceKeyField: raw.sourceKeyField,
			identifierField: raw.identifierField,
			targetModel: raw.target
		});
	});

	const resolvers={
		Mutation: {
			[`${name}Save`]: async (root,{record}) => {
				return sqlWrapper.sequelize.transaction(async transaction => {
					let result;
					if(record.id) {
						const existing = await model.findByPk(record.id,{transaction});
						if(!existing) throw new Error(`${name} does not exist`);
						// only update current fields
						Object.entries(record).filter(([x]) => fields[x]).forEach(([key,value]) => {
							existing[key]=value;
						});
						await existing.save({transaction});
						result = existing;
					} else {
						result = await model.create(record,{transaction});
					}

					// handle creating sub objects
					for(let a in createAssociations) {
						const {target,targetModel,sourceKeyField,identifierField}=createAssociations[a];
						if(record[target]) {

							let n=record[target];
							if(!Array.isArray(n)) n=[n];
							for(let i in n) {
								const sub = Object.assign({},n[i]);
								if(sub.id && !record.id) throw new Error('cannot update sub records with id if creating parent record');

								if(sub[identifierField] && sub[identifierField] != record.id) {
									throw new Error('cannot set '+identifierField+' to a different value than parent id');
								}

								sub[identifierField]=result[sourceKeyField];

								if(sub.id) {
									const existing = await targetModel.findByPk(sub.id,{transaction});
									if(!existing) throw new Error(`${target} with id ${sub.id} does not exist`);
									Object.assign(existing,sub);
									await existing.save({transaction});
								} else {
									await targetModel.create(sub,{transaction});
								}
							}
						}
					}
					return result;
				});
			},
			[`${name}Delete`]: async (root,{id}) => {
				return sqlWrapper.sequelize.transaction(async transaction => {
					if(!id) throw new Error(`An id is required for delete`);
					const existing = await model.findByPk(id,{transaction});
					if(!existing) throw new Error(`${name} does not exist`);
					existing.destroy();
					return existing;
				});
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
	if(!sequelize) throw new Error('missing sequelize from sqlWrapper');

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
			let type = getGqlType(def);
			if(!def.allowNull) type+='!';
			return `${x}:${type}`;
		})}
		created_at: Date
		updated_at: Date
	}
	input ${name}Filter {
		ids:[ID]
		${Object.entries(fields).map(([x,def])=>{
			let type = getGqlType(def);
			//if(!def.allowNull) type+='!';  Filters dont' have required fields
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
