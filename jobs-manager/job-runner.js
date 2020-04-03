const ModuleWrapper=require('../shared/module-wrapper');

function JobRunner(options) {
	this.options=options=Object.assign({},options,{all_modules:true});

	const{job}=options;
	if(!job) throw Error('job is required');
	this.job=job;

	this.moduleWrapper = new ModuleWrapper(options);

	const {log,progress}=options;
	if(!log || !progress) throw new Error('log and progress are required');
	this.log = log;
	this.progress = progress;
}

JobRunner.prototype.run=async function() {
	console.log('Initializing modules');
	await this.moduleWrapper.initialize({all_modules:true});
	const{job}=this;
	const {sqlWrapper}=this.moduleWrapper;
	const job_type=job.type;
	console.log('job_type:',job.type, job);
	const def = this.moduleWrapper.getJobRunnerDefinition({job_type});
	const {log,progress}=this;
	return def.run(job,{sqlWrapper,log,progress});
}

module.exports=JobRunner;
