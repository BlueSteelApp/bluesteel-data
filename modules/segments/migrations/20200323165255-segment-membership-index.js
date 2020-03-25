'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.addIndex('segment_person', {
			fields: ['segment_id','person_id'],
			unique: true
		})
  },

  down: (queryInterface) => {
    return queryInterface.removeIndex('segment_person', {
			fields: ['segment_id','person_id'],
			unique: true
		});
  }
};
