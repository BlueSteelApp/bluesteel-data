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
			build: (SignupPage,Campaign) => {
				SignupPage.belongsTo(Campaign,{
					validate:false,
					through:'campaign_id',
					as: 'Campaign'
				});
				Campaign.hasMany(SignupPage,{
					validate:false,
					as: 'SignupPage'
				});
			}
		}]
	}
};

module.exports={
	name: 'Email',
	models,
	dir: __dirname
};
