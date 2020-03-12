const getCoreImport=require('./core-import');
require('dotenv').config();

const[type,filename]=process.argv.slice(2);
if(!type||!filename) throw new Error('expected format: node cli <type> <filename>');

(async function() {
	const core = await getCoreImport();
	try {
		await core.validate();
	} catch(e) {
		console.error('failed to validate',e);
		throw e;
	}

	try {
		await core.importCsv({type,filename,update:true});
	} catch(e) {
		console.error('failed to import',e);
		throw e;
	}

	await core.close();
})();
