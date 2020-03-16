'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('transaction', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			person_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			amount: {
				type: Sequelize.DOUBLE(25,4),
				allowNull: false
			},
			ts: {
				type: Sequelize.DATE,
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

  down: (queryInterface) => {
		return queryInterface.dropTable('transaction');
  }
};
