'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addIndex('segment', {
			fields: ['label'],
			unique: true
		})
  },

  down: (queryInterface) => {
    return queryInterface.removeIndex('segment', {
			fields: ['label'],
			unique: true
		});
  }
};
