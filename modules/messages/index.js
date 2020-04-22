const sequelize=require('sequelize');

const models = {
	campaign:{
		name: 'Campaign',
		tableName: 'campaign',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: true
			},
		}
	},
	message_set: {
		name: 'MessageSet',
		tableName: 'message_set',
		fields: {
			campaign_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			label: {
				type: sequelize.STRING(255),
				allowNull: true
			},
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
	name: 'Messages',
	models,
	dir: __dirname
};
