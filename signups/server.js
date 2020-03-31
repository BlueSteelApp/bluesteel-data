const express = require('express');
const bodyParser = require('body-parser');

const {buildSequelize} = require('../shared/sql-wrapper');
const ModulesWrapper=require('../modules');
const SignupIntake = require('./intake');

const{BLUESTEEL_SIGNUP_INTAKE_PORT}=process.env;
const port =BLUESTEEL_SIGNUP_INTAKE_PORT || 4343;

async function init() {
	const sequelize = buildSequelize();
	const configuredModules = new ModulesWrapper({sequelize,modules:['signups']});
	configuredModules.initialize();

	const intake = new SignupIntake({sqlWrapper: configuredModules.sqlWrapper});
	await intake.initialize();

	const app = express();
	app.use(bodyParser.urlencoded({ extended: true }));

	app.get('/ok', (req, res) => res.send('OK'));

	app.post('/signup', async (req,res) => {
		const {given_name,family_name,source_code,phone,email}=req;
		try {
			const id = await intake.addSignupRaw({given_name,family_name,source_code,phone,email});
			console.log('received',id);
			return res.send(id);
		} catch(e) {
			console.error(e);
			return res.status(400).json({error:{message:'Failed to process signup'}});
		}
	});

	app.listen({ port }, () =>
		console.log(`🚀 Signup intake ready at ${port}`)
	);
}

init();
