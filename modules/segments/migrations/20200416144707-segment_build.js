'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('segment_build', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			segment_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			query: {
				type: Sequelize.JSON,
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

		await queryInterface.addColumn('segment_person','deleted_at',Sequelize.DATE);
  },
  down: async (queryInterface) => {
		await queryInterface.removeColumn('segment_person','deleted_at');
		await queryInterface.dropTable('segment_build');
  }
};
