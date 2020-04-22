'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('permission_set', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			label: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			description: {
				type: Sequelize.STRING(255),
				allowNull: false
			},

			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
		await queryInterface.createTable('permission_set_permission', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			permission_set_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				unique: "permission-set-module"
			},
			module: {
				type: Sequelize.STRING(64),
				allowNull: false,
				unique: "permission-set-module"
			},
			value: {
				type: Sequelize.STRING(64),
				allowNull: true
			},

			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		}),
		await queryInterface.createTable('user_permission_set',{
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			user_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				unique: 'user-permission-set-user-id'
			},
			permission_set_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},

			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
  }
};
