const [count=10000, concurrent=50] = process.argv.slice(2);

const axios = require('axios');
const qs=require('querystring');
const async=require('async');

async function run() {
	const signups = [];
	for(let i=0;i<count;i++) {
		signups.push({
			index:i,
			given_name:'given_name_'+i,
			family_name: 'family_name_'+i,
			email: 'email_'+i,
			phone: 'phone_'+i,
			source_code: 'test_'+(i%100)
		});
	}

	const results = await async.mapLimit(signups, concurrent, (signup,cb) => {
		let start = new Date();
		const {index}=signup;
		console.log('signup:',index);
		axios.post('http://localhost:4343/signup', qs.stringify(signup))
			.catch(e => cb(e))
			.then(result => {
				console.log('done',result);
				cb(null, {index,result, time: (new Date() - start)});
			});
	});
	console.log(results);
}

run()
	.catch(e => {
		console.error(e);
	}).then(() => console.log('done'));
