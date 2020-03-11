/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('person', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		given_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		family_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING(24),
			allowNull: true
		},
		dwid: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		source_code: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'person'
	});
};
