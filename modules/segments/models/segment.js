/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
		name: 'Segment',
		tableName: 'segment',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: false
			},
			description: {
				type: sequelize.TEXT(),
				allowNull: true
			}
		}
	};
};
