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
console.log(statusInverse);
const {SUBSCRIBED,UNSUBSCRIBED}=statusInverse;

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
				allowNull: false,
				unique: 'subscription-channel-person'
			},
			channel: {
				type: sequelize.INTEGER(4),
				allowNull: false,
				validate: value => {
					if(value != EMAIL) throw new Error('channel must be '+EMAIL);
				},
				defaultValue: EMAIL,
				unique: 'subscription-channel-person'
			},
			// person_email_id, person_phone_id, etc
			person_email_id: {
				field: 'person_channel_id',
				type: sequelize.INTEGER(11),
				allowNull: false,
				unique: 'subscription-channel-person'
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
			name: 'Subscription',
			options: {
				type: 'ManyToOne',
				source_field: 'subscription_id'
			}
		},{
			name: 'PersonEmail',
			options: {
				type: "ManyToOne",
				source_field: 'person_channel_id'
			}
		}]
	},

	email_global_subscription_status: {
		name: "EmailGlobalSubscriptionStatus",
		tableName: 'channel_global_subscription_status',
		fields: {
			channel: {
				type: sequelize.INTEGER(4),
				allowNull: false,
				validate: value => {
					if(value != EMAIL) throw new Error('channel must be '+EMAIL);
				},
				defaultValue: EMAIL,
				unique: 'channel-person-channel-id'
			},
			// person_email_id, person_phone_id, etc
			person_email_id: {
				field: 'person_channel_id',
				type: sequelize.INTEGER(11),
				allowNull: false,
				unique: 'channel-person-channel-id'
			},
			status: {
				type: sequelize.INTEGER(4),
				allowNull: false,
				validate: value => {
					if(value < 0 || value > statusList.length) throw new Error('invalid status: '+value);
				}
			}
		},
	}
};

function SubscriptionManager(options) {
	const {sqlWrapper}=options;
	if(!sqlWrapper) throw new Error('sqlWrapper is a required option');

	this.Subscription = sqlWrapper.getModel('Subscription');
	this.EmailSubscriptionStatus = sqlWrapper.getModel('EmailSubscriptionStatus');
	this.EmailGlobalSubscriptionStatus = sqlWrapper.getModel('EmailGlobalSubscriptionStatus');
}

SubscriptionManager.prototype.getSubscriptionInformation=async function({id}) {
	const{EmailSubscriptionStatus,Subscription}=this;
	const subscriptionList = await EmailSubscriptionStatus.findAll({
		where:{
			person_email_id:id
		},
		include: Subscription
	});

	return subscriptionList;
};

SubscriptionManager.prototype.updateSubscriptions=async function({id:person_email_id}, options) {
	const{updates}=options;

	if(!updates || !Array.isArray(updates)) {
		console.error('invalid updates:',JSON.stringify(updates));
		return;
	}

	const values = updates.filter(x => {
		if(x.status == null) return false;
		if(typeof x.status == 'string') x.status = statusInverse[x.status.toUpperCase()];
		return x.subscription_id != null && (x.status == SUBSCRIBED || x.status == UNSUBSCRIBED);
	}).map(x => {
		return {
			person_email_id,
			channel: EMAIL,
			subscription_id: x.subscription_id,
			status: x.status
		}
	});

	await this.EmailSubscriptionStatus.bulkCreate(values, {
		updateOnDuplicate: ['status']
	});
}

SubscriptionManager.prototype.unsubscribeAll=async function({id:person_email_id}) {
	if(!person_email_id) throw new Error('person_email_id must be non-null');
	const {EmailGlobalSubscriptionStatus} = this;
	await EmailGlobalSubscriptionStatus.upsert({
		person_email_id,
		status: UNSUBSCRIBED
	})
};

function getEndpoints({sqlWrapper}) {
	const manager = new SubscriptionManager({sqlWrapper});

	const {getTokenForPersonEmail} = require('./tokens');

	return [{
		path: '/subscriptions/:token/update',
		method: 'post',
		handle: async (req,res) => {
			const {token}=req.params;
			const parsed = await getTokenForPersonEmail(token);
			console.log('parsed:',parsed);
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
	},{
		path: '/subscriptions/:token/unsubscribeAll',
		handle: async (req,res) => {
			const {token}=req.params;
			const parsed = await getTokenForPersonEmail(token);
			await manager.unsubscribeAll(parsed);
			res.send('You have been unsubscribed');
		}
	}]
}

module.exports={
	tokens: require('./tokens'),

	name: 'Subscriptions',
	models,
	dir: __dirname,
	getEndpoints,

	SubscriptionManager,

	UNSUBSCRIBED,
	SUBSCRIBED
};
