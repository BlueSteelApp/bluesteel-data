/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('address', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING(24),
			allowNull: true
		},
		street_1: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		street_2: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		city: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		region: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		postal_code: {
			type: DataTypes.STRING(16),
			allowNull: true
		},
		latitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		longitude: {
			type: DataTypes.DECIMAL,
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
		},
		person_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'address'
	});
};
