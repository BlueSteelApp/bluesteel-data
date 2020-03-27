'use strict';
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
		return queryInterface.createTable('user', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},

			external_source: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: 'external-identifier'
			},
			external_id: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: 'external-identifier'
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
  },

  down: (queryInterface) => {
		return queryInterface.dropTable('user');
  }
};
