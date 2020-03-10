const Wrapper=require('../shared/sql-wrapper');
const models=require('./models');
const path=require('path');
module.exports = async function(options) {
	options=options||{};
	const inst = new Wrapper({
		models,
		sequelize:options.sequelize,
		migrationsPath:path.join(__dirname,'./migrations')
	});
	return inst;
}
