const parse=require('csv-parse');
const fs=require('fs');
const through2=require('through2');

function CsvStreamer(options) {
	const {wrapper}=options;
	if(!wrapper) throw new Error('wrapper is a required option');
	this.wrapper=wrapper;
}

CsvStreamer.prototype.getStream=async function(options) {
	const {type,filename}=options;
	if(!type||!filename) throw new Error('type and filename are required');
	const def = this.wrapper.getTypes().find(x=>x.name == type);
	if(!def) throw new Error('invalid type '+type+' provided');

	const fields = def.fields;
	if(!fields) throw new Error('expected tableAttributes on def');

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

module.exports=CsvStreamer;
