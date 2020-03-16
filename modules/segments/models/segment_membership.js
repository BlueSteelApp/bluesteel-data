/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
		name: 'SegmentMembership',
		tableName: 'segment_membership',
		fields: {
			segment_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			person_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			}
		},
	};
};
