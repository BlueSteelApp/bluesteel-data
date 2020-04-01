

const axios = require('axios');
const qs=require('querystring');
const async=require('async');

const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

async function runMainThread() {
	const [count=1000, concurrent=50] = process.argv.slice(2);
	const workers = [];
	const results = [];
	for(let i=0; i<concurrent; i++) {
		workers.push(new Promise((resolve,reject) => {
			const worker = new Worker(__filename,{workerData:{count: count,workerId:i}});
			worker.on('message', r => results.push({workerId: i, results:r}));
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
		}));
	}
	await Promise.all(workers);
}

async function runChild() {
	const {workerId:wid,count}=workerData;
	const signups = [];
	for(let i=0;i<count;i++) {
		signups.push({
			index:i,
			given_name:'given_name_'+wid+'_'+i,
			family_name: 'family_name_'+wid+'_'+i,
			email: 'email_'+wid+'_'+i,
			phone: 'phone_'+wid+'_'+i,
			source_code: 'test_'+wid
		});
	}
	const errors=[];
	const results = await async.mapSeries(signups, (signup, cb) => {
		let start = new Date();
		const {index}=signup;
		if(index%500==0)console.log('signup:',index);
		axios.post('http://localhost:4343/signup', qs.stringify(signup))
			.catch(e => {
				errors.push(e);
				console.log('error!',errors.length);
			})
			.then(result => {
				const time = (new Date() - start);
				if(time > 300) console.log(index,'->',time);
				cb(null, {index,result,time});
			});
	});
	parentPort.post({results,errors});
}

async function run() {
	if(isMainThread) return runMainThread();
	else return runChild();
}

run()
	.catch(e => {
		console.error(e);
	}).then(() => console.log('done'));
