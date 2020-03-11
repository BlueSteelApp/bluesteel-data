/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
		name: 'person',
		plural: 'people',
		fields: {
			// id: {
			// 	type: sequelize.INTEGER(11),
			// 	allowNull: false,
			// 	primaryKey: true
			// },
			given_name: {
				type: sequelize.STRING(255),
				allowNull: true
			},
			family_name: {
				type: sequelize.STRING(255),
				allowNull: true
			},
			email: {
				type: sequelize.STRING(255),
				allowNull: true,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			phone: {
				type: sequelize.STRING(24),
				allowNull: true
			},
			source_code: {
				type: sequelize.STRING(255),
				allowNull: true
			},
			// created_at: {
			// 	type: sequelize.DATE,
			// 	allowNull: false,
			// 	defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			// },
			// updated_at: {
			// 	type: sequelize.DATE,
			// 	allowNull: false,
			// 	defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			// }
		}
	};
};
