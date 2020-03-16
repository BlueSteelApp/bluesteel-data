const ModuleWrapper=require('../../shared');
const path=require('path');
module.exports=function({sequelize}) {
	function gql({sqlWrapper,gqlWrapper}) {
		const types = sqlWrapper.getTypes();
		return types.map(type=>gqlWrapper.getModelDefsAndResolvers(type))
			.concat(types.map(type => gqlWrapper.getSaveDefAndResolvers(type)));
	}
	return new ModuleWrapper({
		sequelize,
		name: 'PersonQuery',
		models: require('./models'),
		migrations: path.join(__dirname,'./migrations'),
		gql
	});
};
