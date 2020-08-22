const {gql} = require('apollo-server-express');
const async = require('async');

function Wrapper(options) {
	const{sqlWrapper,serviceLayer}=options;
	if(!sqlWrapper) throw new Error('sqlWrapper required');
	if(!serviceLayer) throw new Error('serviceLayer required');
	this.sqlWrapper=sqlWrapper;
	this.serviceLayer=serviceLayer;
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
	const{sqlWrapper, serviceLayer}=this;
	const {model,name,fields, associations, allow_save=true, allow_create=true,allow_update=true}=type;
	if(!model||!name)throw new Error('model and name required, got:'+JSON.stringify(type));

	if((!allow_create&&!allow_update) || !allow_save) return null;

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
		${Object.entries(fields).filter(([x,def]) => {
			let {gqlSet=true}=def;
			if(def.gqlSet != null) console.log(name,x);
			return gqlSet && !['id','created_by','updated_by'].find(y=>y==x);
		}).map(([x,def])=>{
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
			[`${name}Save`]: async (root,{record}, context) => {
				const service = serviceLayer.getService(name,context);
				return sqlWrapper.sequelize.transaction(async transaction => {
					let result = await service.save(record,{transaction});
					console.log('created:',record);
					await async.eachSeries(createAssociations, async assocation => {
						const {target,sourceKeyField,identifierField}=assocation;
						if(!record[target]) return;

						let subSaves = record[target];
						const targetService = serviceLayer.getService(target,context);
						if(!Array.isArray(subSaves)) subSaves=[subSaves];
						await async.eachSeries(subSaves, async sub => {
							if(sub.id && !record.id) throw new Error('cannot update sub records with id if creating parent record');

							if(sub[identifierField] && sub[identifierField] != record.id) {
								throw new Error('cannot set '+identifierField+' to a different value than parent id');
							}
							sub[identifierField]=result[sourceKeyField];
							await targetService.save(sub,{transaction});
						});
						console.log('done saving');
					});
					return result;
				});
			},
			[`${name}Delete`]: async (root,{id}, context) => {
				const service = serviceLayer.getService(name, context);
				const object = await service.findByPk(id);
				if(!object) throw new Error(`${id} does not exist`);
				await service.delete(id);
				return object;
			},
		},
	};
	return {
		typeDefs, resolvers,
	};
}

Wrapper.prototype.getModelDefsAndResolvers=function(type) {
	const {model,name,fields,associations}=type;
	const {serviceLayer,sqlWrapper} = this;
	const {sequelize}=sqlWrapper;
	if(!sequelize) throw new Error('missing sequelize from sqlWrapper');

	if(!model||!name)throw new Error('model and name required, got:'+JSON.stringify(type));

	const fieldResolvers = {};
	const topLevelResolvers = {};
	const associationDefs = (associations||[]).map(a => {
		const aliases = (a.aliases||[]);
		if(aliases.length !=0 && aliases.length != 2) throw new Error('aliases[] must be null or array with exactly 2 values');

		const targetName=a.name;
		const [aliasedSource=name, aliasedTarget=targetName] = aliases;

		const targetAssociation = model.associations[aliasedTarget];
		if(!targetAssociation) {
			console.log(name,targetName,aliasedTarget,model.associations);
			throw new Error('invalid - no sequelize association defined between '+name+' and '+targetName);
		}

		const targetModel = sequelize.model(targetName);
		if(!targetModel) throw new Error('model with name '+targetName+' does not exist');

		const reverseAssociation = targetModel.associations[aliasedSource||name];
		if(!reverseAssociation && !a.gql_one_way) {
			console.log(targetModel.associations);
			throw new Error('invalid - no reverse association defined from '+targetName+' to '+name);
		}

		let defs = [];
		if(targetAssociation.isMultiAssociation) {
			defs.push(`
				extend type ${name} {
					${aliasedTarget}List: [${targetName}]
				}
			`);
			fieldResolvers[aliasedTarget+'List'] = async ({id},args,context) => {
				const service = serviceLayer.getService(name,context);
				const root = await service.findByPk(id);
				return root['get'+aliasedTarget]();
			};
		} else {
			defs.push(`
				extend type ${name} {
					${aliasedTarget}: ${targetName}
				}
			`);
			fieldResolvers[aliasedTarget] = async ({id},args,context) => {
				const service = serviceLayer.getService(name,context);
				const root = await service.findByPk(id);
				return root['get'+aliasedTarget]();
			}
		}

		if(a.gql_one_way) ; // do nothing
		else if(reverseAssociation.isMultiAssociation) {
			defs.push(`
				extend type ${targetName} {
					${aliasedSource}List: [${name}]
				}
			`);
			topLevelResolvers[targetName]={
				[aliasedSource+'List']: async ({id},args,context) => {
					const service = serviceLayer.getService(targetName,context);
					const root=await service.findByPk(id);
					return root['get'+aliasedSource]();
				}
			}
		} else {
			defs.push(`
				extend type ${targetName} {
					${aliasedSource}: ${name}
				}
			`);
			topLevelResolvers[targetName]={
				[aliasedSource]: async ({id},args,context) => {
					const service = serviceLayer.getService(targetName,context);
					const root=await service.findByPk(id);
					return root['get'+aliasedSource]();
				}
			}
		}
		return defs.join('\n');
	});
	const typeDefs=gql`
	type ${name} {
		id:ID!
		${Object.entries(fields).filter(([x])=>{
			return !['id'].find(y=>y==x);
		}).map(([x,def])=>{
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

		${name}Stats(query:SteamEngineQueryInput!): QueriedStats
	}
	${associationDefs}`;

	Object.keys(fields).forEach(x => {
		fieldResolvers[x] = async (root,args,context) => {
			if(root[x]) return root[x];
			if(!root.id) {
				console.error('missing id from:',root);
				throw new Error('invalid - no id in obj');
			}
			const element = await serviceLayer.getService(name,context).findByPk(root.id);
			if(!element) return null;
			return element[x];
		};
	});

	const resolvers={
		Query: {
			[name]: (root,{id},context) => serviceLayer.getService(name,context).findByPk(id),
			[name+'Stats']: async (root,{query},context) =>serviceLayer.getService(name,context).stats(query),
			[name+"List"]: async (root,{filter,pageSize,page},context) => {
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
				return serviceLayer.getService(name,context).findAll({where,include,limit:pageSize,offset:pageSize*page});
			}},
		[name]: fieldResolvers
	};

	return {
		typeDefs, resolvers:Object.assign({},topLevelResolvers,resolvers),
	};
}

module.exports=Wrapper;
