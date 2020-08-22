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

	const {sqlWrapper,serviceLayer}=configuredModules;
	const auth = new AuthHandler({sqlWrapper, authMethod});
	await auth.initialize();

	const server = new ApolloServer({
		context: async ({req:{user}}) => ({
			user,
			permissions: await serviceLayer.getPermissionsForUser(user.id)
		}),
		modules: gqlModules,
		formatError: (err) => {
			console.error(err);
			if(!err.originalError) return err;
			console.error(err.originalError.stack);
			return err;
		},
	});

	const auth_config = typeof auth.config == 'function' ? auth.config() : (auth.config || {});

	app.get('/config', (req,res) => {
		res.json({auth_method:auth.auth_method, auth_config});
	});

	app.use('/graphql', (req,res,next) => auth.middleware(req,res,next));
	server.applyMiddleware({ app });

	// include other modules

	const endpoints = await configuredModules.getEndpoints();
	endpoints.forEach(x => {
		const {path,method='get',handle}=x;
		console.log('Registering:',method,path);
		app[method](path, handle);
	});


	app.get('/', (req, res) => res.send('Hello SteamEngine'));

	app.listen({ port: 5000 }, () =>
		console.log(`🚀 Server ready at http://localhost:5000`)
	);
};

module.exports=GraphQlServer;
