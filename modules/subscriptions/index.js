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

const statusList = [
	'SUBSCRIBED',
	'UNSUBSCRIBED'
];
const statusInverse={};
statusList.forEach((x,index) => {
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
					if(value < 0 || value > statusList.length) throw new Error('invalid status: '+value);
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
			options: {
				type: "ManyToOne",
				source_field: 'person_channel_id'
			}
		}]
	},
};

function getEndpoints({sqlWrapper}) {
	const SubscriptionManager = require('./manager');
	const manager = new SubscriptionManager({sqlWrapper});

	const {getTokenForPersonEmail} = require('./tokens');

	return [{
		path: '/subscriptions/:token/update',
		method: 'post',
		handle: async (req,res) => {
			const {token}=req.params;
			const parsed = await getTokenForPersonEmail(token);
			const updates = req.body.updates;

			if(updates && updates.length) await manager.updateSubscriptions(parsed, {updates});

			return res.jsonp(await manager.getSubscriptionInformation(parsed));
		}
	},{
		path: '/subscriptions/:token/list',
		handle: async (req,res) => {
			const {token}=req.params;
			const parsed = await getTokenForPersonEmail(token);
			const list = await manager.getSubscriptionInformation(parsed);
			res.jsonp(list);
		}
	}]
}

module.exports={
	tokens: require('./tokens'),

	name: 'Subscriptions',
	models,
	dir: __dirname,
	getEndpoints
};
