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
			},
			query_id:{
				type: sequelize.INTEGER(11),
				allowNull: true
			},
			subject:{
				type: sequelize.TEXT(),
				allowNull: true
			},
			from_name:{
				type: sequelize.STRING(255),
				allowNull: true
			},
			from_email:{
				type: sequelize.STRING(255),
				allowNull: true
			},
			html_body:{
				type: sequelize.TEXT(),
				allowNull: true
			},
			text_body:{
				type: sequelize.TEXT(),
				allowNull: true
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
		},
		{
			name: 'MessageSet',
				options: {
					type: 'ManyToOne',
					source_field: 'message_set_id'
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
