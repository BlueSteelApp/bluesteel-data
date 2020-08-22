const sequelize=require('sequelize');

const models = {
	campaign:{
		name: 'Form',
		tableName: 'form',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: true
			},
			type:{
				type: sequelize.ENUM,
				values: ['normal','condensed','unstyled'],
				allowNull: false
			},
			header:{
				type: sequelize.TEXT('medium'),
				allowNull: true
			},
			fields:{
				type: sequelize.TEXT('medium'),
				allowNull: true
			},
			required_fields:{
				type: sequelize.STRING(255),
				allowNull: false
			},
			segments:{
				type: sequelize.TEXT('medium'),
				allowNull: true
			},
			presubmit:{
				type: sequelize.TEXT('medium'),
				allowNull: true
			},
			button_text:{
				type: sequelize.TEXT('medium'),
				allowNull: true
			},
			footer:{
				type: sequelize.TEXT('medium'),
				allowNull: true
			},
			default_source_code:{
				type: sequelize.STRING(255),
				allowNull: true
			},
			html_json: {
				type: sequelize.TEXT('medium'),
				allowNull: true
			},
		}
	}
};

module.exports={
	name: 'Forms',
	models,
	dir: __dirname
};
