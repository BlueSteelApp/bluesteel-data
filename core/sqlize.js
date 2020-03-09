const Sequelize = require('sequelize');
require('dotenv').config();

const {
	DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD
} = process.env;

module.exports = function(options) {
	options=options||{};

	const {auth:{name,user,password}={
		name:DATABASE_NAME,
		user:DATABASE_USER,
		password:DATABASE_PASSWORD
	}}=options;

	if(!name||!user||!password) {
		if(!DATABASE_NAME||!DATABASE_USER||!DATABASE_PASSWORD) {
			throw new Error('process variables DATABASE_NAME, DATABASE_USER, or DATABASE_PASSWORD are not set');
		}
		throw new Error('auth overrides (name, user, or password) were not fully set');
	}

	return new Sequelize(
		name,
		user,
		password,
		{
			host: process.env.DATABASE_HOST,
			port: process.env.DATABASE_PORT,
			dialect: 'mysql',
			define: {
				freezeTableName: true,
				underscored: true
			},
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000,
			},
			// <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
			// operatorsAliases: false, -- no-op as of v5
			// timestamps: false //If createdAt, modifiedAt are all available, we can use this
		},
	);
};
