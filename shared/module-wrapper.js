const SqlWrapper = require('./sql-wrapper');
const GqlWrapper = require('./gql-wrapper');
const path=require('path');
const gql=require('graphql-tag');

const YasqlQueryRunner = require('./yasql-query');

const fullModuleList = [
	'users',
	'client-module-config',

	'jobs',
	'uploads',
	'imports',

	'signups',

	'people',
	'segments',
	'person-query',
	'transactions',

	'messages',

	'email',
	'email-delivery'
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

	const selected = options.modules.map(x => require('../modules/'+x));
	this.initialized=false;

	this.installed = [{
		name: "Common",
		gql: () => require('./common'),
		shared: true,
	}, {
		name: 'QueryRunner',
		shared: true,
		gql: () => ({typeDefs: gql(YasqlQueryRunner.typeDefs)})
	}].concat(selected);

	this.jobRunnerDefinitions={};
	this.installed.filter(x=>x.jobs).forEach(m => {
		m.jobs.forEach(j => {
			const {type:job_type,run}=j;
			if(!job_type) throw new Error('job_type is required for job runner definitions');
			if(typeof run != 'function') throw new Error('job runner definition must have a .run function');
			if(this.jobRunnerDefinitions[job_type]) throw new Error('job runner definition already exists for: '+job_type);
			this.jobRunnerDefinitions[job_type] = j;
		});
	});
}

ModulesWrapper.gqlModules = [
	require('./common'),

];

ModulesWrapper.fullModuleList=fullModuleList;

ModulesWrapper.prototype.getJobRunnerDefinition=function({job_type}) {
	if(!job_type) throw new Error('options.job_type is required');
	const def = this.jobRunnerDefinitions[job_type];
	if(!def) throw new Error('no job runner definition found for: '+job_type);
	return def;
}

ModulesWrapper.prototype.runMigrations=async function() {
	await this.sqlWrapper.waitForDatabase();
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
	this.installed.filter(x=>!x.shared).forEach(i => {
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
		try {
			const r = x.gql({sqlWrapper});
			if(Array.isArray(r)) r.forEach(y=>gqlParts.push(y));
			else gqlParts.push(r);
		} catch(e) {
			console.log('Failed for: ',x.name);
			throw e;
		}
	});
	return gqlParts.filter(x=>x);
};

ModulesWrapper.prototype.close=function() {
	this.sqlWrapper.close();
}

module.exports=ModulesWrapper;
