/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
		name: 'Transaction',
		tableName: 'transaction',
		fields: {
			person_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			amount: {
				type: sequelize.DOUBLE(25,4),
				allowNull: false
			},
			ts: {
				type: sequelize.DATE,
				allowNull: false
			},
			source_code: {
				type: sequelize.STRING(255),
				allowNull: true
			},
		},
		associations: [{
			name: 'Person',
			build: (Transaction,Person) => {
				Transaction.belongsTo(Person,{
					validate:false,
					through:'person_id',
					as: 'Person'
				});
				Person.hasMany(Transaction,{
					validate:false,
					as: 'Transaction'
				});
			}
		}]
	};
};
