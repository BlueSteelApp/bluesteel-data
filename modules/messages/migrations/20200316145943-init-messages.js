'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('campaign', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			label: {
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
		await queryInterface.createTable('message_set', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			campaign_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			label: {
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
		await queryInterface.dropTable('message_set');
		await queryInterface.dropTable('campaign');
  }
};
