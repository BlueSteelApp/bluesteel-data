const Sequelize=require('sequelize');
const sqlize=require('./sqlize');
const models = require('./models');
const fs=require('fs');
const path=require('path');
module.exports = async function(options) {
	options = options || {};
	const inst = options.inst || await sqlize();

	const defined={};
	Object.values(models).forEach(model => {
		const seqModel = model(inst, Sequelize);
		defined[seqModel.name] = seqModel;
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
		defined,
		validate
	};
}
