const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const AuthHandler = require('../auth');

function GraphQlServer(options) {
	const{configuredModules, authMethod}=options;
	if(!authMethod) throw new Error('authMethod is a required option');
	this.configuredModules=configuredModules;
	this.authMethod=authMethod;
}

GraphQlServer.prototype.start=async function() {
	const{configuredModules,authMethod}=this;

	const gqlModules = configuredModules.getGql();

	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());

	const sqlWrapper=configuredModules.sqlWrapper;
	const auth = new AuthHandler({sqlWrapper, authMethod});
	await auth.initialize();

	const server = new ApolloServer({
		context: ({req:{user}}) => ({
			user,
			wrapper:sqlWrapper.getContextAwareWrapper({user})
		}),
		modules: gqlModules,
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
};

module.exports=GraphQlServer;
