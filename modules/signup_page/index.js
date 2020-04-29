const sequelize=require('sequelize');

const models = {
	email_blast: {
		name: 'SignupPage',
		tableName: 'signup_form',
		fields: {
			campaign_id:{
				type: sequelize.INT(),
				allowNull:true
			},
			label: {
				type: sequelize.STRING(255),
				allowNull: true
			},
			html:{
				type: sequelize.TEXT(),
				allowNull: false
			},
			json:{
				type: sequelize.TEXT(),
				allowNull: false
			}
		},
		associations: [{
			name: 'Campaign',
			options: {
				type: 'ManyToOne',
				source_field: 'campaign_id'
			}
		}]
	}
};

module.exports={
	name: 'Email',
	models,
	dir: __dirname
};
