const {printSchema}=require('graphql');
const { makeExecutableSchema } = require('apollo-server-express');

const {buildSequelize} = require('../shared/sql-wrapper');

const ModulesWrapper=require('../modules');

const fs=require('fs');
const path=require('path');

require('dotenv').config();

async function init() {
	const sequelize = buildSequelize({
		auth:{user:'ignore', password:'ignore', name:'ignore'}
	});
	const configuredModules = new ModulesWrapper({sequelize,all_modules:true});
	configuredModules.initialize();
	const gqlModules = configuredModules.getGql();

	const schema = makeExecutableSchema({
		typeDefs: [require('../app/common').typeDefs].concat(gqlModules.map(x=>x.typeDefs).filter(x=>x))
	});
	fs.writeFileSync(path.join[__dirname,'../schema.graphql'],printSchema(schema));
}

init();
