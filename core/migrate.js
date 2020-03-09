const path = require('path');
const Umzug = require('umzug');
const getSqlize = require('./sqlize');

async function getInst() {
	return getSqlize();
}

// https://github.com/sequelize/umzug#minimal-example
async function getMigrator(sequelize) {
	const umzug = new Umzug({
		migrations: {
			// indicates the folder containing the migration .js files
			path: path.join(__dirname, './migrations'),
			// inject sequelize's QueryInterface in the migrations
			params: [ sequelize.getQueryInterface() ]
		},
		// indicates that the migration data should be store in the database
		// itself through sequelize. The default configuration creates a table
		// named `SequelizeMeta`.
		storage: 'sequelize',
		storageOptions: { sequelize }
	});
	return umzug;
}

(async () => {
  // checks migrations and run them if they are not already applied
	const sequelize = await getInst();
	const umzug = await getMigrator(sequelize);
  await umzug.up();
  console.log('All migrations performed successfully');
	await sequelize.close();
})()
