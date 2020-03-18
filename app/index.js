const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const {buildSequelize} = require('../shared/sql-wrapper');

const ModulesWrapper=require('../modules');

require('dotenv').config();

async function init() {
	const sequelize = buildSequelize();
	const configuredModules = new ModulesWrapper({sequelize});
	console.log(configuredModules);
	configuredModules.initialize();
	const gqlModules = configuredModules.getGql();

	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());

	const server = new ApolloServer({
		modules: [
			require('./common'),
		].concat(gqlModules),
	});

	server.applyMiddleware({ app });

	app.get('/', (req, res) => res.send('Hello BlueSteel'));

	app.listen({ port: 5000 }, () =>
		console.log(`🚀 Server ready at http://localhost:5000`)
	);
}

init();
