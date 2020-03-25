'use strict';
const sequelize = require('sequelize');

module.exports = {
  up: (queryInterface) => {
		return queryInterface.createTable('import_file', {
			id: {
				type: sequelize.INTEGER(11),
				autoIncrement: true,
				allowNull: false,
				primaryKey: true
			},
			import_type: {
				type: sequelize.STRING(255),
				allowNull: false,
			},
			import_raw_table: {
				type: sequelize.STRING(64),
				allowNull: false,
			},
			upload_id: {
				type: sequelize.INTEGER(11),
				allowNull: false,
			},
			status: {
				type: sequelize.STRING(255),
				allowNull: false,
			},
			created_at: {
				type: sequelize.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: sequelize.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
  },

  down: (queryInterface) => {
		return queryInterface.dropTable('import_file');
  }
};
