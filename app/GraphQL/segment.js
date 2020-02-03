import { gql } from 'apollo-server-express';
import * as db from '../database';
export const typeDefs = gql(db.generateTypeDefs('segment','segments'));
export const resolvers = db.generateGraphQLImpl('segment','segments');
