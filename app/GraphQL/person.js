import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
		type Person {
				id: ID!
				email: String
				given_name: String
				family_name: String
				updatedAt:
		}
    extend type Query {
        allPersons: [Person]
        person(id: ID!): Person
    }
		extend type Mutation {
        createPerson(given_name:String,family_name:String):Person
				updatePerson(id:ID!,given_name:String,family_name:String):Person
				deletePerson(id:ID!):Person
    }
`

export const resolvers = {
    Query: {
        allPersons: async () => db.person.findAll(),
        person: async (obj, args, context, info) => db.person.findByPk(args.id),
    },
		Mutation:{
			createPerson:async (obj, args, context, info) => db.person.create({values:args}),
			updatePerson:async (obj, args, context, info) => {
					let count=await db.person.update(args,{where:{id:args.id}});
					return db.person.findByPk(args.id);
			},
			deletePerson:async (obj, args, context, info) => db.person.destroy({where:{id:args.id}})
		}
}
