const {gql} = require('apollo-server-express');
module.exports={
	typeDefs:gql(`
	type Query
	type Mutation
	type ListMetadata {
		count: Int!
	}
	scalar Date

	scalar Email
	scalar Phone
	`)
};
