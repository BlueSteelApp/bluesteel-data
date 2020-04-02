'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('email_delivery', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			person_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				unique: 'person-email-blast-id'
			},
			email_blast_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				unique: 'person-email-blast-id'
			},
			person_email: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			status: {
				type: Sequelize.SMALLINT(),
				allowNull: false,
				defaultValue: 0
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
		return queryInterface.dropTable('email_delivery');
  }
};
