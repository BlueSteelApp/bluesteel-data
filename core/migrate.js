require('dotenv').config();
const getCore=require('./index');
const path=require('path');

(async function() {
	const core=await getCore({
		migrationsPath: path.join(__dirname,'/migrations')
	});
	await core.runMigrations();
})();
