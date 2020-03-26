const Queue=require('bull');
const JobRunner=require('./job-runner');

function getJobUpdateQueue() {
	const redisUri = process.env.JOB_MANAGER_REDIS_URI;
	if(!redisUri) throw new Error('options.redis or JOB_MANAGER_REDIS_URI process variable required');
	console.log('connecting with',redisUri);
	return new Queue('job-update', redisUri);
}

module.exports=async function(job) {
	console.log('starting job',job.id);
	console.log('job data:',job.data);
	try {
		const queue = getJobUpdateQueue();
		const progress = (progress) => queue.add('progress', {id:job.id, progress});
		const runner = new JobRunner({job:job.data,progress,log:console.log});
		return await runner.run();
	} catch(e) {
		console.log('error running',job.id, e);
		throw e;
	} finally {
		console.log('done running');
	}
};
