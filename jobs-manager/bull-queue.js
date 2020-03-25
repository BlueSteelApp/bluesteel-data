const Queue=require('bull');
const path=require('path');

function getQueue(options) {
	const redisUri = options.redis||process.env.JOB_MANAGER_REDIS_URI;
	if(!redisUri) throw new Error('options.redis or JOB_MANAGER_REDIS_URI process variable required');
	console.log('connecting with',redisUri);
	return new Queue('bluesteel', redisUri);
}

function BullQueueServer(options) {
	this.queue=getQueue(options);

	this.onProgress=options.onProgress;
	this.onStart=options.onStart;
	this.onComplete=options.onComplete;
}
BullQueueServer.prototype.start=async function() {
	if(this.started) throw new Error('already started');
	this.started=true;

	this.queue.on('global:progress', (jobId) => {
		console.log('global:progress',jobId);
		this.onProgress({jobId});
	});
	this.queue.on('global:active', (jobId) => {
		console.log('global:active',jobId);
		this.onStart({jobId});
	});
	this.queue.on('global:completed', (jobId,output) => {
		console.log('global:completed',jobId);
		this.onComplete({jobId,output});
	});
}
BullQueueServer.prototype.getActiveJobs=async function() {
	return this.queue.getActive();
}
BullQueueServer.prototype.getJob=async function(jobId) {
	return this.queue.getJob(jobId.toString());
}
BullQueueServer.prototype.addJob=async function(job) {
	const jobId=job.id;
	if(!jobId) throw new Error('job must have an id');
	if(!job.type) throw new Error('job must have a type');
	const added = await this.queue.add(job.type, job.data, {jobId});
	// console.log('added',added);
	return added;
}

function BullQueueClient(options) {
	this.queue=getQueue(options);
}
BullQueueClient.prototype.start=function() {
	this.queue.process('*',path.join(__dirname,'./bull-runner.js'));
	console.log('done starting bull queue client');
}

module.exports={
	server: BullQueueServer,
	client: BullQueueClient
};
