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
		allow_update: false,
	},

	permission_set: {
		name: 'PermissionSet',
		tableName: 'permission_set',
		fields: {
			label: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			description: {
				type: Sequelize.STRING(255),
				allowNull: false
			}
		},

		permissions: {
			read: 'permissions.read',
			edit: 'permissions.edit'
		}
	},
	permission_set_permission: {
		name: 'PermissionSetPermission',
		tableName: 'permission_set_permission',
		fields: {
			permission_set_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			permission: {
				type: Sequelize.STRING(128),
				allowNull: false,
				unique: true
			}
		},
		associations: [{
			name: 'PermissionSet',
			options: {
				type: 'ManyToOne',
				source_field: 'permission_set_id'
			}
		}],

		permissions: {
			read: 'permissions.read',
			edit: 'permissions.edit'
		}
	},
	user_permission_set: {
		name: 'UserPermissionSet',
		tableName: 'user_permission_set',
		fields: {
			user_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			permission_set_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			}
		},
		associations: [{
			name: 'User',
			options: {
				type: 'OneToOne',
				source_field: 'user_id'
			}
		}, {
			name: 'PermissionSet',
			options: {
				type: 'OneToOne',
				source_field: 'permission_set_id'
			}
		}],

		permissions: {
			read: 'permissions.read',
			edit: 'permissions.edit'
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
