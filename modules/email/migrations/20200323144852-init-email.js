'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('email_blast', {
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
			status: {
				type: Sequelize.STRING(64),
				allowNull: false
			},
			message_set_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			query_id:{
				type: Sequelize.INTEGER(11),
				allowNull: true
			},
			subject:{
				type: Sequelize.TEXT(),
				allowNull: false
			},
			from_name:{
				type: Sequelize.STRING(255),
				allowNull: false
			},
			from_email:{
				type: Sequelize.STRING(255),
				allowNull: false
			},
			html_body:{
				type: Sequelize.TEXT(),
				allowNull: false
			},
			text_body:{
				type: Sequelize.TEXT(),
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
  },

  down: async (queryInterface) => {
		return queryInterface.dropTable('email_blast');
  }
};
