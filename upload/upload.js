const multer=require('multer');
const path=require('path');
const fs=require('fs');

const {
	// BLUESTEEL_UPLOAD_STORAGE_TYPE='filestorage',
	BLUESTEEL_UPLOAD_FILE_TMP_DIR='/tmp/bluesteel/files',
	// BLUESTEEL_UPLOAD_FILE_STORAGE_DIR=BLUESTEEL_UPLOAD_FILE_TMP_DIR
}=process.env;

function FileUpload({sqlWrapper}) {
	this.sqlWrapper = sqlWrapper;
	this.Upload = sqlWrapper.getModel('Upload');

	if(!BLUESTEEL_UPLOAD_FILE_TMP_DIR) {
		throw new Error('BLUESTEEL_UPLOAD_FILE_TMP_DIR are required env variables');
	}
}

FileUpload.prototype.initialize=async function() {
	if(this.storage) throw new Error('already initialized');
	const storage = this.storage = multer.diskStorage({
		destination: (req,file,cb) => {
			const {upload:{filename}}=req;
			const fullDir = path.join(BLUESTEEL_UPLOAD_FILE_TMP_DIR,filename);
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
		tmpStat = await new Promise((res,rej) => fs.stat(BLUESTEEL_UPLOAD_FILE_TMP_DIR, (e,r) => {
			if(e) return rej(e);
			res(r);
		}));
	} catch(e) {
		console.error(e);
		throw new Error('failed to load stats for tmp dir - does it exist?');
	}
	if(!tmpStat.isDirectory()) throw new Error(BLUESTEEL_UPLOAD_FILE_TMP_DIR+' is not a directory');
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

	upload.file_path=path.join(BLUESTEEL_UPLOAD_FILE_TMP_DIR,upload.filename,req.file.filename);
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
