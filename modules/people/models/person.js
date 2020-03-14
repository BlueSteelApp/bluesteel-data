/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
		name: 'Person',
		tableName: 'person',
		fields: {
			given_name: {
				type: sequelize.STRING(255),
				allowNull: true
			},
			family_name: {
				type: sequelize.STRING(255),
				allowNull: true
			},
			source_code: {
				type: sequelize.STRING(255),
				allowNull: true
			},
		}
	};
};
