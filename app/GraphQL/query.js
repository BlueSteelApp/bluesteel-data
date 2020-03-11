import { gql } from 'apollo-server-express';
import * as db from '../database';
let o={name:'query',graphQLType:'PersonQuery',graphQLPlural:'PersonQueries'};
export const typeDefs = gql(db.generateTypeDefs(o));
export const resolvers = db.generateGraphQLImpl(o);
