const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const AuthHandler = require('../auth');

const {buildSequelize} = require('../shared/sql-wrapper');

const ModulesWrapper=require('../modules');

require('dotenv').config();

async function init() {
	const sequelize = buildSequelize();
	const configuredModules = new ModulesWrapper({sequelize,all_modules:true});
	console.log(configuredModules);
	configuredModules.initialize();
	const gqlModules = configuredModules.getGql();

	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());

	const auth = new AuthHandler({sqlWrapper:configuredModules.sqlWrapper});
	await auth.initialize();

	const server = new ApolloServer({
		context: ({req}) => ({user:req.user}),
		modules: [
			require('./common'),
		].concat(gqlModules),
	});

	app.get('/config', (req,res) => {
		res.json({auth_method:auth.auth_method});
	});

	app.use('/graphql', (req,res,next) => auth.middleware(req,res,next));
	server.applyMiddleware({ app });

	app.get('/', (req, res) => res.send('Hello BlueSteel'));

	app.listen({ port: 5000 }, () =>
		console.log(`🚀 Server ready at http://localhost:5000`)
	);
}

init().catch(e => {
	throw e;
});
