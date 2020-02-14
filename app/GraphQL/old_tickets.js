import { gql } from 'apollo-server-express'
import * as db from '../database'

export const typeDefs = gql`
    extend type Query {
        tickets: [Ticket]
        ticket(id: ID!): Ticket
    }

    type Ticket {
        id: ID!
        subject: String
        priority_id: Int
        priority: Priority
        status_id: Int
        status: Status
        person_id: Int
        person: Person
        assigned_to_person_id: Int
        assigned_to_person: Person
    }

export const resolvers = {
    Query: {
        tickets: async () => db.tickets.findAll(),
        ticket: async (obj, args, context, info) =>
            db.tickets.findByPk(args.id),
    },
    Ticket: {
        person: async (obj, args, context, info) =>
            db.person.findByPk(obj.person_id),
        priority: async (obj, args, context, info) =>
            db.priorities.findByPk(obj.priority_id),
        status: async (obj, args, context, info) =>
            db.status.findByPk(obj.status_id),
        assigned_to_person: async (obj, args, context, info) =>
            db.person.findByPk(obj.assigned_to_person_id),
    },
}
