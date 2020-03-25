'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('job', {
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
			type: {
				type: Sequelize.ENUM,
				values: ['import','ping'],
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM,
				values: ['waiting','queued','started','completed','errored'],
				allowNull: false
			},

			started_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			completed_at: {
				type: Sequelize.DATE,
				allowNull: true
			},
			errored_at: {
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

		await queryInterface.createTable('job_data', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			job_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				unique: true
			},
			output: {
				type: Sequelize.TEXT(),
				allowNull: true
			},
			error_message: {
				type: Sequelize.TEXT(),
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
		await queryInterface.dropTable('job');
  }
};
