/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
		name: 'PersonQuery',
		tableName: 'person_query',
		fields: {
			label: {
				type: sequelize.STRING(255),
				unique: true,
				allowNull: false
			},
			query: {
				type: sequelize.JSON,
				allowNull: false
			}
		}
	};
};
