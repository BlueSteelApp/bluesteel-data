const GraphQlServer=require('./graphql-server');
const {buildSequelizeFromEnv} = require('../shared/sql-wrapper');
const ModuleWrapper=require('../shared/module-wrapper');
require('dotenv').config();

const {STEAMENGINE_AUTH_METHOD}=process.env;
if (!STEAMENGINE_AUTH_METHOD) throw new Error("An environment variable 'STEAMENGINE_AUTH_METHOD' is required");



const sequelize = buildSequelizeFromEnv();

const configuredModules = new ModuleWrapper({sequelize,all_modules:true});
configuredModules.initialize();

const server = new GraphQlServer({
	configuredModules,
	authMethod: STEAMENGINE_AUTH_METHOD
});
server.start().catch(e => {
	console.error(e);
	throw new Error(e);
});
