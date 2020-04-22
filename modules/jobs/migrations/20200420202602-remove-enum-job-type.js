'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('job', 'type', {
			type: Sequelize.STRING(255),
			allowNull: false
		});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('job','type', {
			type: Sequelize.ENUM,
			values: ['import'],
			allowNull: false,
		});
  }
};
