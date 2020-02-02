/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('person', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		remote_person_id: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: true
		},
		last_modified: {
			type: DataTypes.DATE,
			allowNull: true
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
		dwid: {
			type: DataTypes.INTEGER(11),
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
		source_code: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		opt_out_date: {
			type: DataTypes.DATE,
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
