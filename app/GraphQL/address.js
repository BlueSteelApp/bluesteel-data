import { gql } from 'apollo-server-express';
import * as db from '../database';
export const typeDefs = gql(db.generateTypeDefs('address','addresses'));
export const resolvers = db.generateGraphQLImpl('address','addresses');
