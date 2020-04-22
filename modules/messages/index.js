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
		hooks: {
			beforeCreate: async (instance,opts) => {
				//const c = await instance.getCampaign(); //This fails in beforeCreate -- perhaps because the instance doesn't have the campaign_id set?
				let Campaign=opts.transaction.sequelize.model("Campaign");
				const c = await Campaign.findByPk(instance.dataValues.campaign_id);
				if(!c){
					console.error(instance.dataValues);
					throw new Error('campaign does not exist');
				}
			}
		},
		associations: [{
			name: 'Campaign',
			build: (MessageSet,Campaign) => {
				MessageSet.belongsTo(Campaign,{
					validate:false,
					through:'campaign_id',
					as: 'Campaign'
				});
				Campaign.hasMany(MessageSet,{
					validate:false,
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
