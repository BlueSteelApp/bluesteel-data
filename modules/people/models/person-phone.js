/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
		name: 'PersonPhone',
		tableName: 'person_phone',
		fields: {
			phone: {
				type: sequelize.STRING(255),
				unique: true,
				allowNull: false
			},
			person_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			}
		},
		associations: [{
			name: 'Person',
			build: (PersonPhone,Person) => {
				PersonPhone.belongsTo(Person,{
					validate:false,
					through:'person_id',
					as: 'Person'
				});
				Person.hasMany(PersonPhone,{
					validate:false,
					as: 'PersonPhone'
				});
			}
		}],
		indexes: [
    {
      fields: ['person_id']
    }]
	};
};
