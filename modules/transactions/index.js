const ModuleWrapper=require('../../shared');
const path=require('path');
module.exports=function({sequelize}) {
	function gql({sqlWrapper,gqlWrapper}) {
		const types = sqlWrapper.getTypes();
		return types.map(type=>gqlWrapper.getModelDefsAndResolvers(type));
	}
	return new ModuleWrapper({
		sequelize,
		name: 'Transactions',
		models: require('./models'),
		migrations: path.join(__dirname,'./migrations'),
		gql
	});
};
