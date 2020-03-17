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

	const defaults=types.map(type=>gqlWrapper.getModelDefsAndResolvers(type));

	return {
		name: 'People',
		gql: defaults.concat([{
			typeDefs: gql`
				input PersonSaveExtra {
					id:ID
					given_name: String
					family_name: String
					email: Email
					phone: Phone
					source_code: String
				}

				input PersonFilterExtra {
					ids: [ID]
					given_name: String
					family_name: String
					email: Email
					phone: Phone
					source_code: String
				}

				extend type Query {
					PersonListExtra(filter:PersonFilterExtra,pageSize:Int, page:Int): [Person]
				}

				extend type Mutation {
					PersonSaveExtra(record:PersonSaveExtra!): Person
				}
			`,
			resolvers: {
				Query: {
					PersonListAll: async (root,{filter,pageSize,page}) => {
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
					PersonSaveAll: async (root, {record}) => {
						const{id,given_name,family_name,email,phone,source_code}=record;
						console.log('PersonSave:',record);
						const p = {
							given_name,
							family_name,
							source_code,
						};

						return sequelize.transaction(async transaction => {
							let person=null;
							if(id) {
								const existing = await Person.findByPk(id);
								if(!existing) throw new Error(`Person ${id} does not exist`);
								Object.entries(p).forEach(([key,value]) => {
									existing[key]=value;
								});
								person=await existing.save();
							}else{
								person=await Person.create(p,{transaction});
							}

							const person_id=person.id;
							if(email){
								let existing=PersonEmail.findAll({email});
								if (existing.length>0){
									if (existing[0].person_id==person_id){
										//Do nothing
									}else{
										throw new Error({message:"This email already exists",uri:"/obj/Person/"+existing[0].person_id});
									}
								}else{
									await PersonEmail.create({person_id,email},{transaction});
								}
							}
							if(phone){
								let existing=PersonPhone.findAll({email});
								if (existing.length>0){
									if (existing[0].person_id==person_id){
										//Do nothing
									}else{
										throw new Error({message:"This phone already exists",uri:"/obj/Person/"+existing[0].person_id});
									}
								}else{
									await PersonPhone.create({person_id,phone},{transaction});
								}
							}

							return person;
						});
					}
				}
			}
		}]),
		sqlWrapper,
	};
};
