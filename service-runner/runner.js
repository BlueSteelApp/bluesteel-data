const {workerData} = require('worker_threads');

const {
	service,
	config
} = workerData;
if(!service||!config) throw new Error('service and config are required');

const {buildSequelize} = require('../shared/sql-wrapper');
const ModulesWrapper=require('../modules');

console.log('starting service', service);

const {
	database: {
		host,
		port,
		name,
		user,
		password
	}
}=config;
console.log('config:',config);
const sequelize=buildSequelize({auth:{host,port,name,user,password}});

const runners={};
runners.core = async () => {
	const GraphQlServer = require('../app/graphql-server');
	const configuredModules = new ModulesWrapper({sequelize,all_modules:true});
	await configuredModules.initialize();
	const {authMethod}=config;
	const server = new GraphQlServer({configuredModules,authMethod});
	return server.start();
}
runners.upload = async () => {
	const UploadServer = require('../upload/upload-server');
	const configuredModules = new ModulesWrapper({sequelize,modules:['jobs','uploads']});
	await configuredModules.initialize();
	const {port,uploadFileTempDir}=config;
	const server = new UploadServer({
		sqlWrapper:configuredModules.sqlWrapper,
		port,
		uploadFileTempDir
	});
	return server.start();
}
runners['job-manager'] = async () => {
	const JobManager = require('../jobs-manager/manager');
	const configuredModules = new ModulesWrapper({sequelize,modules:['jobs']});
	await configuredModules.sqlWrapper.waitForDatabase();
	await configuredModules.initialize();
	const Job=configuredModules.sqlWrapper.getModel('Job');
	const JobData=configuredModules.sqlWrapper.getModel('JobData');
	const manager = JobManager({Job,JobData});
	return manager.start();
};
runners['signup-intake'] = async () => {
	const IntakeServer=require('../signups/intake-server');
	const configuredModules = new ModulesWrapper({sequelize,modules:['signups']});
	await configuredModules.initialize();
	const {port}=config;
	const server = new IntakeServer({
		sqlWrapper:configuredModules.sqlWrapper,
		port
	});
	return await server.start();
}

const runner = runners[service.type];
if(!runner) throw new Error('invalid service.type specified: '+service.type);

runner().catch(e => {
	throw e;
})
