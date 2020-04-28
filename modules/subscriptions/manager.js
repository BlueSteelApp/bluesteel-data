function SubscriptionManager(options) {
	const {sqlWrapper}=options;
	if(!sqlWrapper) throw new Error('sqlWrapper is a required option');

	this.Subscription = sqlWrapper.getModel('Subscription');
	this.EmailSubscriptionStatus = sqlWrapper.getModel('EmailSubscriptionStatus');
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

module.exports = SubscriptionManager;
