import { gql } from 'apollo-server-express';
import * as db from '../database';
let o={name:'person',graphQLType:'Person',graphQLPlural:'People'};
export const typeDefs = gql(db.generateTypeDefs(o));
export const resolvers = db.generateGraphQLImpl(o);
