const {gql} = require('apollo-server-express');
const Sequelize=require('sequelize');

const models = {
	person: () => {
		return {
			name: 'Person',
			tableName: 'person',
			fields: {
				given_name: {
					type: Sequelize.STRING(255),
					allowNull: true
				},
				family_name: {
					type: Sequelize.STRING(255),
					allowNull: true
				},
				source_code: {
					type: Sequelize.STRING(255),
					allowNull: true
				},
			}
		}
	},
	person_email: ({sqlWrapper}) => {
		return {
			name: 'PersonEmail',
			tableName: 'person_email',
			fields: {
				email: {
					type: Sequelize.STRING(255),
					unique: true,
					allowNull: false,
					gqlType: 'Email'
				},
				person_id: {
					type: Sequelize.INTEGER(11),
					allowNull: false
				}
			},
			validate: {
				beforeCreate: async(instance,options) => {
					const PersonEmail=sqlWrapper.getModel('PersonEmail');
					const emailList = await PersonEmail.findAll({
						where:{email:instance.email}
					},options);
					const email=emailList[0];
					if(email && email.person_id != instance.person_id) {
						throw new Error('email already exists for another person');
					}
				}
			},
			associations: [{
				name: 'Person',
				createWith: true,
				filter: {
					filterFields: ['email'],
					include: ({email}) => email && {email}
				},
				options: {
					type: 'ManyToOne',
					source_field: 'person_id'
				}
			}],
			indexes: [
				{fields: ['person_id']},
				{unique:true,fields: ['email']},
			]
		};
	},
	person_phone: ({sqlWrapper}) => {
		return {
			name: 'PersonPhone',
			tableName: 'person_phone',
			fields: {
				phone: {
					type: Sequelize.STRING(255),
					unique: true,
					allowNull: false,
					gqlType: 'Phone'
				},
				person_id: {
					type: Sequelize.INTEGER(11),
					allowNull: false
				}
			},
			validate: {
				beforeCreate: async(instance,options) => {
					const Person=sqlWrapper.getModel('Person');
					const person = await Person.findByPk(instance.person_id,options);
					if(!person) throw new Error('person does not exist');

					const PersonPhone=sqlWrapper.getModel('PersonPhone');
					const phoneList = await PersonPhone.findAll({
						where:{phone:instance.phone}
					},options);
					const phone = phoneList[0];
					if(phone && phone.person_id != instance.person_id) {
						throw new Error('phone already exists for another person');
					}
				}
			},
			associations: [{
				name: 'Person',
				createWith: true,
				filter: {
					filterFields: ['phone'],
					include: ({phone}) => phone && {phone}
				},
				options: {
					type: 'ManyToOne',
					source_field: 'person_id'
				}
			}],
			indexes: [{
				fields: ['person_id']
			}]
		};
	}
};

module.exports = {
	name: 'People',
	models,
	dir: __dirname,
	gql: ({sqlWrapper: {sequelize}}) => {
		const Person = sequelize.model('Person');
		const PersonEmail = sequelize.model('PersonEmail');
		const PersonPhone = sequelize.model('PersonPhone');
		return [{
			typeDefs: gql`
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
				}
			}
		}]
	}
};
