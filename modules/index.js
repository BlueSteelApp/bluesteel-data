const SqlWrapper = require('../shared/sql-wrapper');
const GqlWrapper = require('../shared/gql-wrapper');
const path=require('path');

const fullModuleList = [
	'jobs',

	'people',
	'segments',
	'person-query',
	'transactions',
	'messages',
	'email'
];

function ModulesWrapper(options) {
	options=Object.assign({},options);

	let{sqlWrapper,gqlWrapper}=options;
	if(!sqlWrapper) {
		sqlWrapper = new SqlWrapper(options);
	}
	if(!gqlWrapper) {
		gqlWrapper = new GqlWrapper({sqlWrapper});
	}

	this.sqlWrapper = sqlWrapper;
	this.gqlWrapper = gqlWrapper;

	if(options.all_modules) options.modules = fullModuleList;
	if(!options.modules||!options.modules.length) throw new Error('modules is a required option');

	this.installed = options.modules.map(x => require('./'+x));
	this.initialized=false;
	console.error("Fininshed constructor");
}

ModulesWrapper.fullModuleList=fullModuleList;

ModulesWrapper.prototype.runMigrations=async function() {
	for(let x in this.installed) {
		const m = this.installed[x];
		let migrationsPath; // =m.migrationsPath||path.join(m.dir,'./migrations');
		if(m.migrations) migrationsPath=m.migrations;
		else if(!m.dir) throw new Error('no migrations specific, nor dir');
		else migrationsPath=path.join(m.dir,'./migrations');
		await this.sqlWrapper.runMigrations(migrationsPath);
	}
};

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
	return gqlParts.filter(x=>x);
};

ModulesWrapper.prototype.close=function() {
	this.sqlWrapper.close();
}

module.exports=ModulesWrapper;
