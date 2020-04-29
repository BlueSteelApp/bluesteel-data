const sequelize=require('sequelize');

const models = {
	transaction: {
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
			options: {
				type: 'ManyToOne',
				source_field: 'person_id'
			}
		}]
	}
};

module.exports={
	name: 'Transactions',
	models,
	dir: __dirname
};
