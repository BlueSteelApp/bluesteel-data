'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('upload', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			label: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			filename: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			file_path: {
				type: Sequelize.TEXT(),
				allowNull :true
			},
			status: {
				type: Sequelize.ENUM(),
				allowNull: false,
				values: ['waiting','started','complete']
			},
			on_completed_job_id: {
				type: Sequelize.INTEGER(11),
				allowNull: true
			},

			started_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			completed_at: {
				type: Sequelize.DATE,
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
		return queryInterface.dropTable('upload');
  }
};
