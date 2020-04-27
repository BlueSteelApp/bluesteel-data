const multer=require('multer');
const path=require('path');
const fs=require('fs');

function FileUpload({sqlWrapper, uploadFileTempDir}) {
	this.sqlWrapper = sqlWrapper;
	this.Upload = sqlWrapper.getModel('File');
	if(!uploadFileTempDir) throw new Error('uploadFileTempDir is a required option');
	this.uploadFileTempDir = uploadFileTempDir;
}

FileUpload.prototype.initialize=async function() {
	if(this.storage) throw new Error('already initialized');
	const storage = this.storage = multer.diskStorage({
		destination: (req,file,cb) => {
			const {upload:{filename}}=req;
			const fullDir = path.join(this.uploadFileTempDir,filename);
			fs.mkdir(fullDir, e => {
				if(e) return cb(e);
				cb(null, fullDir);
			});
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		}
	});
	const uploadMulter=this.uploadMulter=multer({storage});
	this.single=uploadMulter.single('upload_file');
	let tmpStat;
	try {
		tmpStat = await new Promise((res,rej) => fs.stat(this.uploadFileTempDir, (e,r) => {
			if(e) return rej(e);
			res(r);
		}));
	} catch(e) {
		console.error(e);
		throw new Error('failed to load stats for tmp dir - does it exist?');
	}
	if(!tmpStat.isDirectory()) throw new Error(this.uploadFileTempDir+' is not a directory');
};

FileUpload.prototype.uploadRequest=async function({req,res},options) {
	const {upload_id} = options;
	if(!upload_id) throw new Error('no upload_id provided in options');
	const upload=await this.Upload.findByPk(upload_id);
	if(!upload) throw new Error('invalid upload_id: '+upload_id);
	if(upload.status != 'waiting') throw new Error('upload already in progress');

	upload.status = 'started';
	await upload.save();
	req.upload = upload;

	const result = await new Promise((resolve,reject) => {
		this.single(req, res, e => {
			if(e) return reject(e);
			if(!req.file || !req.file.path) return reject('invalid file in req');
			resolve(req.file);
		});
	});

	upload.file_path=path.join(this.uploadFileTempDir,upload.filename,req.file.filename);
	upload.status='complete';
	await upload.save();

	const onCompletedJob = await upload.getOnCompletedJob();
	if(onCompletedJob) {
		onCompletedJob.status='queued';
		await onCompletedJob.save();
	}

	return result;
};

module.exports=FileUpload;
