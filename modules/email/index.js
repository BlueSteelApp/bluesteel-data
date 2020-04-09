const sequelize=require('sequelize');

const STATUS=[
	'DRAFT',
	'READY_TO_BUILD',
	'BUILDING_LIST',
	'LIST_BUILT',
	'SENDING',
	'SENT'
];
const statusMap = {};
STATUS.forEach(x=>statusMap[x]=1);

const models = {
	email_blast: {
		name: 'EmailBlast',
		tableName: 'email_blast',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: true
			},
			message_set_id: {
				type: sequelize.INTEGER(11),
				allowNull: false,
				validate: {
					messageSetExists: async function(instance) {
						const m = await instance.getMessageSet();
						if(!m) throw new Error('message set does not exist');
					}
				}
			},
			query_id:{
				type: sequelize.INTEGER(11),
				allowNull: true
			},
			subject:{
				type: sequelize.TEXT(),
				allowNull: false
			},
			from_name:{
				type: sequelize.STRING(255),
				allowNull: false
			},
			from_email:{
				type: sequelize.STRING(255),
				allowNull: false
			},
			html_body:{
				type: sequelize.TEXT(),
				allowNull: false
			},
			text_body:{
				type: sequelize.TEXT(),
				allowNull: false
			},
			status: {
				type: sequelize.STRING(32),
				defaultValue: 'DRAFT',
				allowNull: false,
				validate: {
					isIn: [STATUS]
				},

				gqlSet: false
			}
		},
		associations: [{
			name: 'PersonQuery',
			build: (EmailBlast,PersonQuery) => {
				EmailBlast.belongsTo(PersonQuery, {
					validate: false,
					through: 'query_id',
					as: 'Query'
				});
				PersonQuery.hasMany(EmailBlast, {
					validate: false,
					foreignKey: 'query_id',
					as: 'EmailBlast'
				})
			},
			aliases: ['EmailBlast', 'Query']
		},{
			name: 'MessageSet',
			build: (EmailBlast,MessageSet) => {
				EmailBlast.belongsTo(MessageSet,{
					validate:false,
					through:'message_set_id',
					as: 'MessageSet'
				});
				MessageSet.hasMany(EmailBlast,{
					validate:false,
					as: 'EmailBlast'
				});
			}
		}]
	},
	email_template: {
		name: 'EmailTemplate',
		tableName: 'email_template',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: true
			}
		}
	}
};

module.exports={
	name: 'Email',
	models,
	dir: __dirname
};
