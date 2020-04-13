require('dotenv').config();

const {
	BLUESTEEL_JOB_QUEUE_TYPE,
	BLUESTEEL_JOB_QUEUE_JOB_LIMIT
}=process.env;

function JobEventHandler(options) {
	options=options||{};
	this.Job=options.Job;
	this.JobData=options.JobData;
	if(!this.Job||!this.JobData) throw new Error('Job and JobData required');
}
JobEventHandler.prototype.getJob=async function(jobId) {
	const{Job}=this;
	const job = await Job.findByPk(jobId);
	if(!job) throw new Error(jobId+' is not a real job');
	return job;
}
JobEventHandler.prototype.setDataForJob=async function({jobId,error,output}) {
	const job=await this.getJob(jobId);
	const jobData = await job.getJobData();
	if(jobData) {
		if(output !== undefined) jobData.output=output;
		if(error !== undefined) jobData.error = error;
		await jobData.save();
	} else {
		const{JobData}=this;
		const d = {job_id: jobId,output,error};
		await JobData.create(d);
	}
};
JobEventHandler.prototype.handleJobStart=async function({jobId}) {
	const job=await this.getJob(jobId);
	job.started_at = new Date();
	job.status = 'started';
	await job.save();
	return job;
};
JobEventHandler.prototype.handleJobComplete=async function({jobId,output}) {
	const job=await this.getJob(jobId);
	job.completed_at = new Date();
	job.status = 'completed';
	await job.save();
	await this.setDataForJob({jobId,output});
};
JobEventHandler.prototype.handleJobProgress=async function({jobId,progress}) {
	console.log('logging progress:',{jobId,progress});
};
JobEventHandler.prototype.handleJobError=async function({jobId,error}) {
	const job=await this.getJob(jobId);
	job.status='error';
	job.errored_at = 'errored_at';
	await job.save();
	await this.setDataForJob({jobId,error});
};

function JobQueue(options) {
	options=options||{};
	const queueType = options.queueType || BLUESTEEL_JOB_QUEUE_TYPE || 'bull';

	const eventHandler = options.eventHandler;
	options.onStart = ({jobId}) => eventHandler.handleJobStart({jobId});
	options.onComplete = ({jobId,output}) => eventHandler.handleJobComplete({jobId,output});
	options.onProgress = ({jobId,progress}) => eventHandler.handleJobProgress({jobId,progress});
	options.onError = ({jobId,error}) => eventHandler.handleJobError({jobId,error});

	if(queueType == 'bull') {
		const bull=require('./bull-queue');
		this.server=new bull.server(options);
	} else throw new Error('invalid queue type: '+queueType);

}
JobQueue.prototype.start=async function() {
	await this.server.start();
	console.log('JobQueue has started');
}
JobQueue.prototype.getActiveJobs=async function() {
	return this.server.getActiveJobs();
}
JobQueue.prototype.addJob=async function(job) {
	const {id}=job;
	if(!id) throw new Error('job must have id');
	await this.server.addJob(job);
	return true;
}

function JobManager(options) {
	options=Object.assign({},options);
	options.eventHandler=options.eventHandler||new JobEventHandler(options);
	this.jobQueue=options.queue || new JobQueue(options);
	this.Job=options.Job;
	if(!this.Job) throw new Error('Job and JobData are required');
	this.job_limit = options.job_limit || BLUESTEEL_JOB_QUEUE_JOB_LIMIT || 10;
}
JobManager.prototype.start=async function() {
	await this.jobQueue.start();
	this.run();
}
JobManager.prototype.run=async function() {
	await this.manage();
	setTimeout(()=>this.run(), 10000);
}
JobManager.prototype.manage=async function() {
	const active = await this.jobQueue.getActiveJobs();
	let queued;
	try {
		queued = await this.getQueuedJobs({limit:this.job_limit - active.length});
	} catch(e) {
		console.error('failed to get queued jobs:\n',e);
		return;
	}
	for(let q in queued) {
		const j=queued[q];
		try {
			await this.jobQueue.addJob(j);
		} catch(e) {
			console.error(e);
		}
	}
}
JobManager.prototype.getQueuedJobs=function({limit}) {
	return this.Job.findAll({
		where:{
			status: 'queued'
		},
		order: [['created_at','desc']],
		limit: limit||this.job_limit
	});
}

module.exports=JobManager;
JobManager.JobQueue=JobQueue;
JobManager.JobEventHandler=JobEventHandler;
