const [service]=process.argv.slice(2);
if(!service) throw new Error('service is a required param');

const ModulesWrapper=require('../modules');
const {buildSequelize}=require('../shared/sql-wrapper');

async function startManager() {
	const sequelize = buildSequelize();
	const configuredModules = new ModulesWrapper({sequelize,modules:['jobs']});
	await configuredModules.sqlWrapper.waitForDatabase();
	await configuredModules.initialize();

	const Job=configuredModules.sqlWrapper.getModel('Job');
	const JobData=configuredModules.sqlWrapper.getModel('JobData');
	const manager = new (require('./manager'))({Job,JobData});
	manager.start();
}

if(service == 'manager') {
	// const manager = new (require('./manager'))();
	// manager.start();
	startManager();
} else if(service == 'client') {
	const client = new (require('./client'))();
	client.start();
} else if(service == 'test') {
	const manager = new (require('./manager'))();
	manager.addJob({
		id: "test"+(new Date().getTime()), data: {
			testData:1
		}
	}).then(r => {
		console.log('started',r);
	});
} else throw new Error('invalid service: '+service);
