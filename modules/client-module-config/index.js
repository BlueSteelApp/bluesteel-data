const sequelize=require('sequelize');
const {gql} = require('apollo-server-express');

const models = {
	client_module_config: {
		name: 'ClientModuleConfig',
		tableName: 'client_module_config',
		fields: {
			id: {
				type: sequelize.STRING(255),
				primaryKey: true,
				allowNull: false,
			},
			value: {
				type: sequelize.STRING(255),
				allowNull: false
			},
			created_by: {
				type: sequelize.INTEGER(11)
			},
			updated_by: {
				type: sequelize.INTEGER(11)
			}
		},
		allow_create:false,
		allow_update:false
	},
};

module.exports={
	name: 'ClientModuleConfig',
	models,
	dir: __dirname,
	gql: ({serviceLayer}) => {
		return {
			typeDefs: gql`
extend type Mutation {
	ClientModuleConfigSet(id:String!,value:String!): ClientModuleConfig
}
			`,
			resolvers: {
				Mutation: {
					ClientModuleConfigSet: async (root,args,context) => {
						const{id,value}=args;
						const fullResult = await serviceLayer.getService('ClientModuleConfig',context).findOrCreate({
							where: {id},
							defaults: {value}
						});
						const result = fullResult[0];
						result.value=value;
						await result.save;
						return result;
					}
				}
			}
		}
	}
};
