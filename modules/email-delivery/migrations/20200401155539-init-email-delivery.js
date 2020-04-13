'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('email_delivery', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			person_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			email_blast_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
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
		await queryInterface.addConstraint('email_delivery', ['person_id','email_blast_id'], {type:'unique'});
		return;
  },

  down: async (queryInterface) => {
		return queryInterface.dropTable('email_delivery');
  }
};
