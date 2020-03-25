const Modules=require('./');
require('dotenv').config();
(async function() {
	const sequelize=require('../shared/sql-wrapper').buildSequelize();
	const core = new Modules({sequelize,all_modules:true});
	// const migrations = core.installed.map(x=>x.sqlWrapper.runMigrations());
	await core.runMigrations();
	await sequelize.close();
})();
