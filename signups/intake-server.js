const express = require('express');
const bodyParser = require('body-parser');

const SignupIntake = require('./intake');

function IntakeServer({sqlWrapper,port}) {
	this.sqlWrapper=sqlWrapper;
	this.port = port;
}
IntakeServer.prototype.start = async function() {
	const{sqlWrapper,port}=this;
	const intake = new SignupIntake({sqlWrapper});
	await intake.initialize();
	const app = express();
	app.use(bodyParser.urlencoded({ extended: true }));

	app.get('/ok', (req, res) => res.send('OK'));

	app.post('/signup', async (req,res) => {
		const {given_name,family_name,source_code,phone,email}=req.body;
		if(![given_name,family_name,source_code,phone,email].find(x=>x)) {
			console.log('no data present in body:',req.body);
			return res.status(400).json({error:{message:'No data present in body'}});
		}
		try {
			const signup_id = await intake.addSignupRaw({given_name,family_name,source_code,phone,email});
			return res.status(200).jsonp({signup_id});
		} catch(e) {
			console.error(e);
			return res.status(400).json({error:{message:'Failed to process signup'}});
		}
	});

	app.listen({ port }, () =>
		console.log(`🚀 Signup intake ready at ${port}`)
	);
}

module.exports = IntakeServer;
