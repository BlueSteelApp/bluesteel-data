const sequelize=require('sequelize');
const models = {
	file_import: {
		name: 'FileImport',
		tableName: 'file_import',
		fields: {
			import_type: {
				type: sequelize.STRING(255),
				allowNull: false,
			},
			import_raw_table: {
				type: sequelize.STRING(64),
				allowNull: false,
			},
			upload_id: {
				type: sequelize.INTEGER(11),
				allowNull: false,
			},
			status: {
				type: sequelize.STRING(255),
				allowNull: false,
			}
		}
	}
};

module.exports={
	name:'Imports',
	dir: __dirname,
	models
};
