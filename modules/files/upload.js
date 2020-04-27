const multer=require('multer');
const path=require('path');
const fs=require('fs');
const {v4:uuid}=require('uuid');
const moment=require('moment-timezone');

function FileUpload({sqlWrapper, uploadFileTempDir}) {
	this.sqlWrapper = sqlWrapper;
	this.File = sqlWrapper.getModel('File');
	if(!uploadFileTempDir) throw new Error('uploadFileTempDir is a required option');
	this.uploadFileTempDir = uploadFileTempDir;
}

FileUpload.prototype.initialize=async function() {
	if(this.storage) throw new Error('already initialized');
	const storage = this.storage = multer.diskStorage({
		destination: (req,file,cb) => {
			cb(null, this.uploadFileTempDir);
		},
		filename: function (req, file, cb) {
			cb(null, uuid());
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

FileUpload.prototype.uploadRequest=async function({req,res}) {
	let start = moment().toISOString();

	const result = await new Promise((resolve,reject) => {
		this.single(req, res, e => {
			if(e) return reject(e);
			if(!req.file || !req.file.path) return reject('invalid file in req');
			resolve(req.file);
		});
	});

	const uploadFile = {
		label: 'Upload - '+start,
		file_path: path.join(this.uploadFileTempDir,result.filename)
	};

	const file = await this.File.create(uploadFile);
	return file.id;
};

module.exports=FileUpload;
