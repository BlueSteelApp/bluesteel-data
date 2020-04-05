const GraphQlServer=require('./graphql-server');
const {buildSequelizeFromEnv} = require('../shared/sql-wrapper');
const ModuleWrapper=require('../shared/module-wrapper');
require('dotenv').config();

const {BLUESTEEL_AUTH_METHOD}=process.env;
if (!BLUESTEEL_AUTH_METHOD) throw new Error("An environment variable 'BLUESTEEL_AUTH_METHOD' is required");



const sequelize = buildSequelizeFromEnv();

const configuredModules = new ModuleWrapper({sequelize,all_modules:true});
configuredModules.initialize();

const server = new GraphQlServer({
	configuredModules,
	authMethod: BLUESTEEL_AUTH_METHOD
});
server.start().catch(e => {
	throw new Error(e);
});
