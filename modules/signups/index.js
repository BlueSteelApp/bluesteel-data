const Sequelize=require('sequelize');

const models={
	signup_raw: {
		name:'SignupRaw',
		tableName: 'signup_raw',
		fields: {
			given_name: {
				type: Sequelize.STRING(255),
				allowNull: true
			},
			family_name: {
				type: Sequelize.STRING(255),
				allowNull: true
			},

			email: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			phone: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},

			source_code: {
				type: Sequelize.STRING(255),
				allowNull: true
			}
		}
	},
};

module.exports={
	name: 'Signups',
	dir: __dirname,
	models
};
