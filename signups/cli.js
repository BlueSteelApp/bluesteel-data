const IntakeServer = require('./intake-server');
const {buildSequelizeFromEnv} = require('../shared/sql-wrapper');
const ModuleWrapper=require('../shared/module-wrapper');

const BLUESTEEL_SIGNUP_INTAKE_PORT=process.env.BLUESTEEL_SIGNUP_INTAKE_PORT || 4000;

async function init() {
	const sequelize = buildSequelizeFromEnv();
	const configuredModules = new ModuleWrapper({sequelize,modules:['signups']});
	await configuredModules.initialize();

	const server = new IntakeServer({
		sqlWrapper:configuredModules.sqlWrapper,
		port: BLUESTEEL_SIGNUP_INTAKE_PORT
	});
	return await server.start();
}

init().catch(e => {
	throw e;
});
