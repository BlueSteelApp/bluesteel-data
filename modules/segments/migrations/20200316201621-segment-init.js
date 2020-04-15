'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('segment_person', {
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
			person_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			status: {
				type: Sequelize.INTEGER(2),
				allowNull: false
			},
			added_at: {
				type: Sequelize.DATE(),
				allowNull: true
			},
			removed_at: {
				type: Sequelize.DATE(),
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
		await queryInterface.createTable('segment', {
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
				type: Sequelize.TEXT(),
				allowNull: true
			},
			person_query_id: {
				type: Sequelize.INTEGER(11),
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
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: async (queryInterface) => {
		await queryInterface.dropTable('segment_person');
		await queryInterface.dropTable('segment');
  }
};
