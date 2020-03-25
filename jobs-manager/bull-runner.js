module.exports=async function(job) {
	console.log('job:',JSON.stringify(job.data));
	await job.progress(100);
	await job.log('completing now!');
	return {completed:'true'};
};
