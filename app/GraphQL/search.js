import { gql } from 'apollo-server-express';
import * as db from '../database';
export const typeDefs = gql(db.generateTypeDefs('search','searches'));
export const resolvers = db.generateGraphQLImpl('search','searches');
