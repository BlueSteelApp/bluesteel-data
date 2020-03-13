const models=require('./models');
const SqlWrapper=require('../../shared/sql-wrapper');
const GqlWrapper=require('../../shared/gql-wrapper');
const path=require('path');
const {gql} = require('apollo-server-express');

module.exports=function(options) {
	const{sequelize}=options;
	const sqlWrapper = new SqlWrapper({
		sequelize,
		models,
		migrationsPath: path.join(__dirname,'./migrations')
	});
	const gqlWrapper = new GqlWrapper({sqlWrapper});

	const types = sqlWrapper.getTypes();
	const Person = sqlWrapper.sequelize.model('Person');
	const PersonEmail = sqlWrapper.sequelize.model('PersonEmail');
	const PersonPhone = sqlWrapper.sequelize.model('PersonPhone');

	return {
		name: 'People',
		gql: types.map(type=>gqlWrapper.getModelDefsAndResolvers(type)).concat([{
			typeDefs: gql`
				input PersonCreate {
					given_name: String
					family_name: String
					email: String
					phone: String
					source_code: String
				}

				input PersonFilter {
					ids: [ID]
					given_name: String
					family_name: String
					email: String
					phone: String
					source_code: String
				}

				extend type Query {
					PersonList(filter:PersonFilter,pageSize:Int,page:Int): [Person]
				}

				extend type Mutation {
					PersonCreate(record:PersonCreate!): Person
				}
			`,
			resolvers: {
				Query: {
					PersonList: async (root,{filter,pageSize,page}) => {
						filter=filter||{};
						pageSize = pageSize || 50;
						page = page || 0;
						if(pageSize > 1000) throw new Error('pageSize limited to 1000');
						const where={}; const include=[];
						if(filter.ids) where.ids=filter.ids;
						else if(Object.keys(filter).length) {
							const{given_name,family_name,email,phone,source_code}=filter;
							if(given_name) where.given_name=given_name;
							if(family_name) where.family_name=family_name;
							if(source_code) where.source_code=source_code;
							if(email) include.push({
								model: PersonEmail,
								as: 'PersonEmail',
								where: {email}
							});
							if(phone) include.push({
								model: PersonPhone,
								as: 'PersonPhone',
								where: {phone}
							});
						}
						return Person.findAll({where,include,limit:pageSize,offset:pageSize*page});
					}
				},
				Mutation: {
					PersonCreate: async (root, {record}) => {
						const{given_name,family_name,email,phone,source_code}=record;
						console.log('Creating:',{given_name,family_name,email,phone,source_code});
						const p = {
							given_name,
							family_name,
							source_code,
						};
						return sequelize.transaction(async transaction => {
							const r = await Person.create(p,{transaction});
							if(!r||!r.id) throw new Error('failed to create');
							const person_id=r.id;
							if(email) await PersonEmail.create({person_id,email,source_code},{transaction});
							if(phone) await PersonPhone.create({person_id,phone,source_code},{transaction});
							return r;
						});
					}
				}
			}
		}]),
		sqlWrapper,
	};
};
