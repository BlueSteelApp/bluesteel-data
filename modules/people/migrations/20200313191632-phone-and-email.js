'use strict';
const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('person_email', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			email: {
				type: Sequelize.STRING(255),
				unique: true,
				allowNull: false
			},
			person_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
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
		await queryInterface.createTable('person_phone', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			phone: {
				type: Sequelize.STRING(255),
				unique: true,
				allowNull: false
			},
			person_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
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
  down: async (queryInterface) => {
		await queryInterface.dropTable('person_email');
		await queryInterface.dropTable('person_phone');
  }
};
