const Queue=require('bull');
const path=require('path');

function getJobRunnerQueue(options) {
	const redisUri = options.redis||process.env.JOB_MANAGER_REDIS_URI;
	if(!redisUri) throw new Error('options.redis or JOB_MANAGER_REDIS_URI process variable required');
	console.log('connecting with',redisUri);
	return new Queue('job-runner', redisUri);
}
function getJobUpdateQueue(options) {
	const redisUri = options.redis||process.env.JOB_MANAGER_REDIS_URI;
	if(!redisUri) throw new Error('options.redis or JOB_MANAGER_REDIS_URI process variable required');
	console.log('connecting with',redisUri);
	return new Queue('job-update', redisUri);
}

function BullQueueServer(options) {
	this.jobRunnerQueue=getJobRunnerQueue(options);
	this.jobUpdateQueue=getJobUpdateQueue(options);

	this.onProgress=options.onProgress;
	this.onStart=options.onStart;
	this.onComplete=options.onComplete;
}
BullQueueServer.prototype.start=async function() {
	if(this.started) throw new Error('already started');
	this.started=true;

	const{jobUpdateQueue,jobRunnerQueue}=this;
	jobRunnerQueue.on('global:progress', (jobId) => {
		console.log('global:progress',jobId);
		this.onProgress({jobId});
	});
	jobRunnerQueue.on('global:active', (jobId) => {
		console.log('global:active',jobId);
		this.onStart({jobId});
	});
	jobRunnerQueue.on('global:completed', (jobId,output) => {
		console.log('global:completed',jobId);
		this.onComplete({jobId,output});
	});
	jobRunnerQueue.on('global:error', (jobId,output) => {
		console.log('global:error',jobId);
		this.onComplete({jobId,output});
	});

	jobUpdateQueue.process('progress', job => {
		const{data}=job;
		const {id,progress}=data;
		this.onProgress({jobId:id,progress});
	});
}
BullQueueServer.prototype.getActiveJobs=async function() {
	return this.jobRunnerQueue.getActive();
}
BullQueueServer.prototype.getJob=async function(jobId) {
	return this.jobRunnerQueue.getJob(jobId.toString());
}
BullQueueServer.prototype.addJob=async function(job) {
	const jobId=job.id;
	if(!jobId) throw new Error('job must have an id');
	if(!job.type) throw new Error('job must have a type');
	const added = await this.jobRunnerQueue.add(job.type, job, {jobId});
	return added;
}

function BullQueueClient(options) {
	this.jobRunnerQueue=getJobRunnerQueue(options);
}
BullQueueClient.prototype.start=function() {
	this.jobRunnerQueue.process('*',path.join(__dirname,'./bull-runner.js'));
	console.log('done starting bull queue client');
}

module.exports={
	server: BullQueueServer,
	client: BullQueueClient
};
