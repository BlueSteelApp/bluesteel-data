const SqlWrapper = require('../shared/sql-wrapper');
const GqlWrapper = require('../shared/gql-wrapper');

function ModulesWrapper(options) {
	let{sqlWrapper,gqlWrapper}=options;
	if(!sqlWrapper) {
		sqlWrapper = new SqlWrapper(options);
	}
	if(!gqlWrapper) {
		gqlWrapper = new GqlWrapper({sqlWrapper});
	}

	this.sqlWrapper = sqlWrapper;
	this.gqlWrapper = gqlWrapper;

	this.installed = [
		require('./people'),
		require('./segments'),
		require('./person-query'),
		require('./transactions')
	];
	this.initialized=false;
}

ModulesWrapper.prototype.initialize=function() {
	if(this.initialized) throw new Error('already initialized');
	const{sqlWrapper}=this;
	this.installed.forEach(i => {
		const{name,models}=i;
		console.log('Assembling models for',name);
		sqlWrapper.assembleModels(models);
	});
	this.initialized = true;
};

ModulesWrapper.prototype.getGql=function() {
	if(!this.initialized) throw new Error('must call initialize first');
	const{installed,sqlWrapper,gqlWrapper}=this;
	const gqlParts = [];
	sqlWrapper.getTypes().forEach(type => {
		gqlParts.push(gqlWrapper.getModelDefsAndResolvers(type));
		gqlParts.push(gqlWrapper.getSaveDefAndResolvers(type));
	});
	installed.filter(x=>x.gql).forEach(x => {
		const r = x.gql({sqlWrapper});
		if(Array.isArray(r)) r.forEach(y=>gqlParts.push(y));
		else gqlParts.push(r);
	});
	return gqlParts;
};

module.exports=ModulesWrapper;
