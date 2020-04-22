const {gql} = require('apollo-server-express');
const Sequelize=require('sequelize');

const models = {
	person: {
		name: 'User',
		tableName: 'user',
		fields: {
			external_source: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			external_id: {
				type: Sequelize.STRING(255),
				allowNull: false
			},

			username: {
				type: Sequelize.STRING(255)
			},
			email: {
				type: Sequelize.STRING(255)
			},
			name: {
				type: Sequelize.STRING(255)
			},
			profile_picture: {
				type: Sequelize.TEXT()
			}
		},
		allow_create: false,
		allow_update: false
	},
	user_role: {
		name: 'UserRole',
		tableName: 'user_role',
		paranoid: true,
		fields: {
			user_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			role: {
				type: Sequelize.STRING(32),
				allowNull: false
			}
		}
	}
};

module.exports = {
	name: 'Users',
	models,
	dir: __dirname,
	gql: () => {
		return [{
			typeDefs: gql`
			extend type Query {
				Me: User!
			}`,
			resolvers: {
				Query: {
					Me: (root,args,context) => context.user
				}
			}
		}]
	}
};
