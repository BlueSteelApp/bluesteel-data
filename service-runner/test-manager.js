const Manager = require('./manager');
require('dotenv').config();

const database = {
	host: process.env.DATABASE_HOST,
	name: process.env.DATABASE_NAME,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.PORT || 3306
}

if(['host','name','user','password'].find(x=>!database[x])) {
	console.log(process.env);
	throw new Error('missing config data:');
} else {
	console.log('database:',database);
}

const services = [{
	service: {
		type: 'core',
		name: 'core'
	},
	config: {
		database,
		authMethod: 'dev'
	}
}, {
	service: {
		type: 'upload',
		name: 'upload'
	},
	config: {
		database,
		uploadFileTempDir: '/tmp/'
	}
}];

const manager = new Manager({services});
manager.start();
