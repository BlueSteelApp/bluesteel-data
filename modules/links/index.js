const Sequelize=require('Sequelize');

const models = {
	link: {
		name: "Link",
		fields: {
			label: {
				type: Sequelize.STRING(255)
			},
			uri: {
				type: Sequelize.TEXT()
			}
		}
	}
};

module.exports = {
	name: "Links",
	models,
	dir: __dirname,
};
