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
		hooks: {
			beforeCreate: async (instance) => {
				const person = await instance.getPerson();
				if(!person) throw new Error('person does not exist');
			}
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
	}
};

module.exports={
	name: 'Transactions',
	models,
	dir: __dirname
};
