const sequelize=require('sequelize');
module.exports=function() {
	return {
		name: 'fileImport',
		plural: 'fileImports',
		tableName: 'file_import',
		fields: {
			id: {
				type: sequelize.INTEGER(11),
				allowNull: false,
				primaryKey: true
			},
			import_type: {
				type: sequelize.STRING(255),
				allowNull: false,
			},
			import_table: {
				type: sequelize.STRING(64),
				allowNull: false,
			},
			filepath: {
				type: sequelize.TEXT(),
				allowNull: false,
			},
			status: {
				type: sequelize.STRING(255),
				allowNull: false,
			},
			created_at: {
				type: sequelize.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: sequelize.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			}
		}
	};
};
