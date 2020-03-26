const {gql} = require('apollo-server-express');
module.exports={
	typeDefs:gql(`
	type Query
	type Mutation
	type ListMetadata {
		count: Int!
	}
	scalar Date

	"""
	An email string value. Is not validated immediately.
	"""
	scalar Email
	scalar Phone
	scalar JSON
	`)
};
