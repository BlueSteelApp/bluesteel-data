const sqlize=require('./sqlize');
const models = require('./models');
const fs=require('fs');
const path=require('path');
module.exports = async function(options) {
	options = options || {};
	const inst = options.inst || await sqlize();

	const defined={};
	const fraktureDefs = {};
	Object.values(models).forEach(model => {
		const fraktureDef = model();
		const{name,plural,fields}=fraktureDef;
		fraktureDefs[name]=fraktureDef;
		if(!name||!plural||!fields) throw new Error('name, plural and fields are required for each model');
		const seqModel = inst.define(name,fields,{
			tableName: fraktureDef.tableName || name
		});
		defined[seqModel.name] = seqModel;
		fraktureDef.model = seqModel;
	});

	// validating the migrations occurred
	async function validate() {
		let [results] = await inst.query('select * from SequelizeMeta');
		if(!results||!results.length) throw new Error('invalid migration data - please run migrations to update database');
		results = results.map(x=>x.name);
		console.log('confirmed',results.length,'migrations confirmed');
		const files = fs.readdirSync(path.join(__dirname,'./migrations/'));
		console.log('checking against',files);
		const missing = files.filter(x=>!results.find(y=>y==x));
		if(missing.length) throw new Error('missing '+missing.join(',')+' migrations');
		const incorrect = results.filter(x=>!files.find(y=>y==x));
		if(incorrect.length) throw new Error('incorrect '+incorrect.join(',')+' migrations applied');
	}

	return {
		inst,
		fraktureDefs,
		defined,
		validate
	};
}
