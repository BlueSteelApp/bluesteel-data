import { gql } from 'apollo-server-express';
import * as db from '../database';
let o={name:'address',graphQLType:'Address',graphQLPlural:'Addresses'};
export const typeDefs = gql(db.generateTypeDefs(o));
export const resolvers = db.generateGraphQLImpl(o);
