import { gql } from 'apollo-server-express';
import * as db from '../database';
export const typeDefs = gql(db.generateTypeDefs('person','People'));
export const resolvers = db.generateGraphQLImpl('person','People');
