require('dotenv').config();

function JobClient(options) {
	options=options||{};
	const queueType = options.queueType || process.env.STEAMENGINE_JOB_QUEUE_TYPE || 'bull';
	if(queueType == 'bull') {
		const bull=require('./bull-queue');
		this.client=new bull.client(options);
	} else throw new Error('invalid queue type: '+queueType);
}

JobClient.prototype.start=async function() {
	await this.client.start();
	console.log('JobClient has started');
}

module.exports=JobClient;
