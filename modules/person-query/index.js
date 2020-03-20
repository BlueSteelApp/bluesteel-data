const sequelize=require('sequelize');

const models = {
	person_query: function() {
		return {
			name: 'PersonQuery',
			tableName: 'person_query',
			fields: {
				label: {
					type: sequelize.STRING(255),
					unique: true,
					allowNull: false
				},
				query: {
					type: sequelize.JSON,
					allowNull: true //sometimes we need to save before we're composing a query
				}
			}
		};
	}
};

module.exports={
	name: 'PersonQuery',
	models,
	dir: __dirname
};
