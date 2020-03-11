import { gql } from 'apollo-server-express';

export const typeDefs = gql(`
			type Query
			type Mutation
			type ListMetadata {
			    count: Int!
			}
			scalar Date
			`);

export const resolvers = {};
