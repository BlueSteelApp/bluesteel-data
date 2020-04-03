const UploadServer = require('./upload-server');
const {buildSequelizeFromEnv} = require('../shared/sql-wrapper');
const ModuleWrapper=require('../shared/module-wrapper');

const BLUESTEEL_UPLOAD_PORT=process.env.BLUESTEEL_UPLOAD_PORT || 4000;

async function init() {
	const sequelize = buildSequelizeFromEnv();
	const configuredModules = new ModuleWrapper({sequelize,modules:['jobs','uploads']});
	configuredModules.initialize();

	const server = new UploadServer({
		sqlWrapper:configuredModules.sqlWrapper,
		uploadFileTempDir:process.env.BLUESTEEL_UPLOAD_FILE_TMP_DIR,
		port: BLUESTEEL_UPLOAD_PORT
	});
	return await server.start();
}

init().catch(e => {
	throw e;
});
