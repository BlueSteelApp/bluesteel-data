'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('client_module_config', {
			id: {
				type: Sequelize.STRING(255),
				primaryKey: true,
				allowNull: false,
			},
			value: {
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
			},
			created_by: {
				type: Sequelize.INTEGER(11)
			},
			updated_by: {
				type: Sequelize.INTEGER(11)
			}
		});
  },

  down: async (queryInterface) => {
		await queryInterface.dropTable('client_module_config');
  }
};
