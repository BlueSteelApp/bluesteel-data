require('dotenv').config();
(async function() {
	const sequelize=require('../shared/sql-wrapper').buildSequelize();
	const core = require('./index')({sequelize});
	// const migrations = core.installed.map(x=>x.sqlWrapper.runMigrations());
	// await Promise.all(migrations);
	for(let i in core.installed) {
		await core.installed[i].sqlWrapper.runMigrations();
	}
	await sequelize.close();
})();
