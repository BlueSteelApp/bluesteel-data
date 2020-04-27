const ModuleWrapper=require('../shared/module-wrapper');
require('dotenv').config();
(async function() {
	console.log('building modules...');
	const sequelize=require('../shared/sql-wrapper').buildSequelizeFromEnv();
	const core = new ModuleWrapper({sequelize,all_modules:true});
	console.log('running migrations...');
	await core.runMigrations();
	await sequelize.close();
})();
