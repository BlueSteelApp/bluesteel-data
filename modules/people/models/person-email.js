/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
		name: 'PersonEmail',
		tableName: 'person_email',
		fields: {
			email: {
				type: sequelize.STRING(255),
				unique: true,
				allowNull: false
			},
			person_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			source_code: {
				type: sequelize.STRING(255),
				allowNull: true
			},
		},
		associations: [{
			name: 'Person',
			build: (PersonEmail,Person) => {
				PersonEmail.belongsTo(Person,{
					validate:false,
					through:'person_id',
					as: 'Person'
				});
				Person.hasMany(PersonEmail,{
					validate: false,
					as: 'PersonEmail'
				});
			}
		}]
	};
};
