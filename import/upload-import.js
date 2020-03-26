const CsvImporter=require('./csv-import');

function UploadImporter(options) {
	const {uploadImport,sqlWrapper}=options;
	if(!uploadImport || !sqlWrapper) throw new Error('uploadImport and sqlWrapper required');
	this.uploadImport=uploadImport;
	this.sqlWrapper=sqlWrapper;
}

UploadImporter.prototype.run=async function() {
	if(this.running) throw new Error('already running');
	this.running=true;

	const{uploadImport,sqlWrapper}=this;
	const {import_type}=uploadImport;
	if(!import_type) throw new Error('import_type is invalid');
	const upload = await uploadImport.getUpload();
	if(!upload) throw new Error('upload missing');

	const {file_path,status}=upload;
	if(status != 'complete') throw new Error('upload is not complete');
	if(!file_path) throw new Error('file_path is missing from upload');

	if(file_path.slice(-4) == '.csv') {
		const importer = new CsvImporter({filename:file_path,sqlWrapper});
		return importer.runStandardImport();
	}
	else throw new Error('Unrecognized file type: '+file_path.slice(-4));
};

module.exports=UploadImporter;
