const express = require('express');
const bodyParser = require('body-parser');
const FileUpload = require('./upload');

function UploadServer(options) {
	const{port,sqlWrapper,uploadFileTempDir}=options;
	this.port=port;
	this.sqlWrapper=sqlWrapper;
	this.uploadFileTempDir=uploadFileTempDir;
}

UploadServer.prototype.start = async function() {
	const upload = this.upload = new FileUpload({
		sqlWrapper: this.sqlWrapper,
		uploadFileTempDir: this.uploadFileTempDir
	});
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

	app.listen({ port: this.port }, () =>
		console.log(`🚀 Server ready at ${this.port}`)
	);
}

module.exports=UploadServer;
