require('dotenv').config();
(async function() {
	const core = require('./index')({});
	const migrations = core.installed.map(x=>x.sqlWrapper.runMigrations());
	await Promise.all(migrations);
})();
