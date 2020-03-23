const CsvImporter=require('./csv-import');
const Modules=require('../modules');
const {buildSequelize}=require('../shared/sql-wrapper');
require('dotenv').config();

let [type,filename]=process.argv.slice(2);
if(!filename) {
	filename=type;
	type='Person';
}
if(!filename) throw new Error('expected format: node cli <filename>');

(async function() {
	const sequelize=buildSequelize();
	const modules=new Modules({sequelize});
	await modules.initialize();

	const{sqlWrapper}=modules;
	const core = new CsvImporter({filename, sqlWrapper, primaryType: type});
	try {
		await core.runStandardImport();
	} catch(e) {
		console.error('failed to import',e);
		throw e;
	}

	await modules.close();
})();
