require('dotenv').config();
const QueryProcessor=require('./processor');
(async function() {
	const sequelize=require('../shared/sql-wrapper').buildSequelize();
	const core = require('../modules/')({sequelize});
	// const migrations = core.installed.map(x=>x.sqlWrapper.runMigrations());
	// await Promise.all(migrations);
	// for(let i in core.installed) {
	// 	await core.installed[i].sqlWrapper.runMigrations();
	// }
	const {sqlWrapper}= core.installed[0];
	const engine = new QueryProcessor({sqlWrapper, query: {
		'==': [{var: 'given_name'}, 'Justin']
	}, model:sequelize.model('Person')});
	console.log('final:\n',await engine.process({fields:['id']}));

	await sequelize.close();
})();
