const sequelize=require('sequelize');

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
				allowNull: false
			},
			query_id:{
				type: sequelize.INTEGER(11),
				allowNull: false
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
			}
		},
		hooks: {
			beforeCreate: async (instance) => {
				const m = await instance.getMessageSet();
				if(!m) throw new Error('campaign does not exist');
			}
		},
		associations: [{
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
