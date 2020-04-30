const {gql} = require('apollo-server-express');
const sequelize=require('sequelize');

const models = {
	person_query: function() {
		return {
			name: 'PersonQuery',
			tableName: 'person_query',
			fields: {
				label: {
					type: sequelize.STRING(255),
					unique: true,
					allowNull: false
				},
				query: {
					type: sequelize.JSON,
					allowNull: true //sometimes we need to save before we're composing a query
				}
			}
		};
	}
};

module.exports={
	name: 'PersonQuery',
	models,
	dir: __dirname,
	gql: ({serviceLayer}) => ({
		typeDefs: gql`
			type PersonQueryResult {
				count: Int
				"""
				Max limit on returning results from this endpoint is 1000.
				Defaults to 100.
				"""
				person_list(limit:Int): [Person]
			}

			extend type Query {
				ExecutePersonQuery(conditions:[BlueSteelQueryComponentInput]): PersonQueryResult
			}
		`,
		resolvers: {
			Query: {
				ExecutePersonQuery: async (root,{conditions},context) => {
					const Person = serviceLayer.getService('Person',context);
					const runner = Person.getYasqlQueryRunner({conditions, outputs: [{
						name: 'id',
						expression: 'id'
					}]});
					return runner.run({limit:100});
				}
			},
			PersonQueryResult: {
				count: ({runner}) => runner.getCount(),
				person_list: ({runner}, {limit}) => {
					if(!limit) limit = 100;
					if(limit > 1000) throw new Error('limit must be <= 1000');
					return runner.run({limit});
				}
			}
		}
	})
};
