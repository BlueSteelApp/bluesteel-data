const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const {buildSequelize} = require('../shared/sql-wrapper');

require('dotenv').config();

async function init() {
	const sequelize = buildSequelize();
	const configuredModules = require('../modules')({sequelize});

	const gqlModules = [];
	configuredModules.installed.forEach(x=>{
		if(x.init) x.init();

		let gql = x.gql;
		if(gql) {
			if(!Array.isArray(gql)) gql=[gql];
			if(!gql.length) {
				// console.log('empty gql found for ',x);
				return;
			}
			if(typeof gql[0] != 'object') {
				throw new Error('elements of gql must be object, not '+typeof gql[0]);
			}
			x.gql.forEach(y=>gqlModules.push(y))
		}
	});

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
