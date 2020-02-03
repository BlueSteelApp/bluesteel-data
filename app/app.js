import '@babel/polyfill';
import express from 'express';
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = new ApolloServer({
	modules: [
		require('./GraphQL/common'),
		require('./GraphQL/person'),
		require('./GraphQL/segment'),
		require('./GraphQL/address'),
		require('./GraphQL/search')
	],
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.send('Hello BlueSteel'));

app.listen({ port: 5000 }, () =>
	console.log(`🚀 Server ready at http://localhost:5000`)
);
