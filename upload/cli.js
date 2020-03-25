const express = require('express');
const bodyParser = require('body-parser');
const FileUpload = require('./upload');

const {buildSequelize} = require('../shared/sql-wrapper');
const ModulesWrapper=require('../modules');

const BLUESTEEL_UPLOAD_PORT=4000;

async function init() {
	const sequelize = buildSequelize();
	const configuredModules = new ModulesWrapper({sequelize,modules:['jobs','uploads']});
	configuredModules.initialize();

	const upload = new FileUpload(configuredModules);
	await upload.initialize();

	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.get('/ok', (req, res) => res.send('OK'));
	app.post('/upload/:upload_id', async (req,res) => {
		const {upload_id}=req.params;
		try {
			await upload.uploadRequest({req,res},{upload_id});
			res.status(200).jsonp({upload_id});
		} catch(e) {
			console.error(e);
			res.status(500).jsonp('Failed to upload');
		}
	});

	app.listen({ port: BLUESTEEL_UPLOAD_PORT }, () =>
		console.log(`🚀 Server ready at ${BLUESTEEL_UPLOAD_PORT}`)
	);
}

init();
