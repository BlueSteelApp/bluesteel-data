const GraphQlServer=require('./graphql-server');
const {buildSequelizeFromEnv} = require('../shared/sql-wrapper');
const ModulesWrapper=require('../modules');

require('dotenv').config();

const sequelize = buildSequelizeFromEnv();

const server = new GraphQlServer({
	configuredModules: new ModulesWrapper({sequelize,all_modules:true})
});
server.start().catch(e => {
	throw new Error(e);
});
