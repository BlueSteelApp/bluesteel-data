const sequelize=require('sequelize');

const subscriptionChannel = [
	'EMAIL',
	'PHONE'
];
const subscriptionChannelInverse = {};
subscriptionChannel.forEach((type,index) => {
	subscriptionChannelInverse[type]=index;
});
const {EMAIL,/*PHONE*/}=subscriptionChannelInverse;

const status = [
	'SUBSCRIBED',
	'UNSUBSCRIBED'
];
const statusInverse={};
status.forEach((x,index) => {
	statusInverse[x]=index;
});
// const {SUBSCRIBED,UNSUBSCRIBED}=statusInverse;

const models = {
	subscription: {
		name: "Subscription",
		tableName: 'subscription',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: false,
				unique: true
			},
			description: {
				type: sequelize.STRING(255),
				allowNull: false
			}
		}
	},
	// this is a scoped model built ontop of channel_subscription_status
	email_subscription_status: {
		name: "EmailSubscriptionStatus",
		tableName: 'channel_subscription_status',
		fields: {
			subscription_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			channel: {
				type: sequelize.INTEGER(4),
				allowNull: false,
				validate: value => {
					if(value != EMAIL) throw new Error('channel must be '+EMAIL);
				},
				defaultValue: EMAIL
			},
			// person_email_id, person_phone_id, etc
			person_email_id: {
				field: 'person_channel_id',
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			status: {
				type: sequelize.INTEGER(4),
				allowNull: false,
				validate: value => {
					if(value < 0 || value > status.length) throw new Error('invalid status: '+value);
				}
			}
		},
		defaultScope: {
			where: {
				channel: EMAIL
			}
		},
		associations: [{
			name: 'PersonEmail',
			build: (EmailSubscriptionStatus,PersonEmail) => {
				PersonEmail.hasMany(EmailSubscriptionStatus, {
					foreignKey: 'person_channel_id',
					validate: false,
					as: 'EmailSubscriptionStatus'
				});
				EmailSubscriptionStatus.belongsTo(PersonEmail, {
					through: 'person_channel_id',
					validate: false,
					as: "PersonEmail"
				});
			}
		}]
	},
};

module.exports={
	name: 'Subscriptions',
	models,
	dir: __dirname
};
