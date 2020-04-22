'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscription', {
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

    return queryInterface.createTable('channel_subscription_status', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			subscription_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			channel: {
				type: Sequelize.INTEGER(4),
				allowNull: false
			},
			person_channel_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false
			},
			status: {
				type: Sequelize.INTEGER(4),
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
    await queryInterface.dropTable('subscription');
		return queryInterface.dropTable('channel_subscription_status');
  }
};
