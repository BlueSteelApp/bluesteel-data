const ModuleWrapper=require('../shared/module-wrapper');
require('dotenv').config();
(async function() {
	const sequelize=require('../shared/sql-wrapper').buildSequelizeFromEnv();
	const core = new ModuleWrapper({sequelize,all_modules:true});
	// const migrations = core.installed.map(x=>x.sqlWrapper.runMigrations());
	await core.runMigrations();
	await sequelize.close();
})();
