const parse=require('csv-parse');
const parseSync=require('csv-parse/lib/sync')
const fs=require('fs');
const through2=require('through2');
const firstline=require('firstline');
const {Importer,ImportMapping}=require('./import');

function CsvStreamer(options) {
	const {filename}=options;
	this.filename=filename;
}
CsvStreamer.prototype.getHeader=async function() {
	const header = await firstline(this.filename);
	if(!header.length) throw new Error('no header found for'+this.filename);
	const row = parseSync(header)[0];
	return row;
};
CsvStreamer.prototype.getStream=function() {
	const {filename}=this;

	const fileStream = fs.createReadStream(filename);
	const parser = parse({});

	fileStream.pipe(parser);

	let headers;
	const transform = through2.obj(function(o,enc,cb) {
		console.log('processing:',o);
		if(!headers) headers = o.map(x=>x);
		else {
			const r = {};
			headers.forEach((x,i)=>r[x]=o[i]||'');
			this.push(r);
		}
		cb();
	});
	parser.pipe(transform);
	return transform;
}

function CsvImporter(options) {
	this.csvStreamer = new CsvStreamer(options);
	this.sqlWrapper=options.sqlWrapper;
	this.options=options;
	if(!this.sqlWrapper) throw new Error('sqlWrapper is required');
}
CsvImporter.prototype.runStandardImport=async function() {
	const header = await this.csvStreamer.getHeader();
	const sourceFields=header;
	console.log('Using sourceFields:',sourceFields);
	const {sourceToTargetMap,deferenceFields}=ImportMapping.getStandardImportDefinitions().Person;

	const importMapping = new ImportMapping(this.sqlWrapper,Object.assign({}, this.options, {
		sourceFields,
		sourceToTargetMap,
		primaryDereferences:deferenceFields
	}));

	const importer=new Importer({importMapping, sqlWrapper:this.sqlWrapper});
	const stream = this.csvStreamer.getStream();
	return await importer.loadImportTableFromStream({stream});

}

module.exports=CsvImporter;
module.exports.CsvImporter=CsvImporter;
module.exports.CsvStreamer=CsvStreamer;
