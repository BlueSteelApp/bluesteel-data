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

			build: (MessageSet,Campaign) => {
				MessageSet.belongsTo(Campaign,{
					validate:false,
					through:'campaign_id',
					as: 'Campaign'
				});
				MessageSet.addValidate('campaignExists', async function() {
					const{campaign_id}=this;
					if(!await Campaign.findByPk(campaign_id)) throw new Error('campaign does not exist');
				});
				Campaign.hasMany(MessageSet,{
					validate:false,
					foreignKey: 'campaign_id',
					as: 'MessageSet'
				});
			}
		}]
	}
};

module.exports={
	name: 'Messages',
	models,
	dir: __dirname
};
