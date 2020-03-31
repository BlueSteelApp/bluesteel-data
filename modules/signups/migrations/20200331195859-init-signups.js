'use strict';
const Sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
		return queryInterface.createTable('signup_raw', {
			id: {
				type: Sequelize.STRING(36),
				allowNull: false,
				primaryKey: true
			},
			given_name: {
				type: Sequelize.STRING(255),
				allowNull: true
			},
			family_name: {
				type: Sequelize.STRING(255),
				allowNull: true
			},

			email: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			phone: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},

			source_code: {
				type: Sequelize.STRING(255),
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
		});
  },

  down: (queryInterface) => {
		return queryInterface.dropTable('signup_raw');
  }
};
