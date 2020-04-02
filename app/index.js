const GraphQlServer=require('./graphql-server');
const {buildSequelizeFromEnv} = require('../shared/sql-wrapper');
const ModulesWrapper=require('../modules');
const {BLUESTEEL_AUTH_METHOD}=process.env;

require('dotenv').config();

const sequelize = buildSequelizeFromEnv();

const configuredModules = new ModulesWrapper({sequelize,all_modules:true});
configuredModules.initialize();

const server = new GraphQlServer({
	configuredModules,
	authMethod: BLUESTEEL_AUTH_METHOD
});
server.start().catch(e => {
	throw new Error(e);
});
