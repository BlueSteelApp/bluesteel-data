const CsvImporter=require('./csv-import');

function FileImporter(options) {
	const {fileImport,sqlWrapper}=options;
	if(!fileImport || !sqlWrapper) throw new Error('uploadImport and sqlWrapper required');
	this.fileImport=fileImport;
	this.sqlWrapper=sqlWrapper;
}

FileImporter.prototype.run=async function() {
	if(this.running) throw new Error('already running');
	this.running=true;

	const{fileImport,sqlWrapper}=this;
	const {import_type}=fileImport;
	if(!import_type) throw new Error('import_type is invalid');
	const file = await fileImport.getFile();
	if(!file) throw new Error('file missing');

	const {file_path}=file;
	if(!file_path) throw new Error('file_path is missing from upload');

	if(file_path.slice(-4) == '.csv') {
		const importer = new CsvImporter({filename:file_path,sqlWrapper});
		return importer.runStandardImport();
	}
	else throw new Error('Unrecognized file type: '+file_path.slice(-4));
};

module.exports=FileImporter;
