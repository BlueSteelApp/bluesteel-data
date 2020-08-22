const SqlWrapper = require('./sql-wrapper');
const GqlWrapper = require('./gql-wrapper');
const ServiceLayer = require('./service-layer');
// const path=require('path');
const gql=require('graphql-tag');

const YasqlQueryRunner = require('./yasql-query');

const fullModuleList = [
	'users',
	'client-module-config',

	'jobs',
	'files',
	'imports',
	'forms',
	'person-query',

	'links',

	'signups',

	'people',
	'segments',
	'transactions',

	'subscriptions',

	'messages',

	'email',
	'email-delivery'
];

function ModulesWrapper(options) {
	options=Object.assign({},options);

	let{sqlWrapper,gqlWrapper,serviceLayer}=options;
	if(!sqlWrapper) {
		sqlWrapper = new SqlWrapper(options);
	}
	if(!serviceLayer) {
		serviceLayer = new ServiceLayer({sqlWrapper});
	}
	if(!gqlWrapper) {
		gqlWrapper = new GqlWrapper({sqlWrapper,serviceLayer});
	}

	this.sqlWrapper = sqlWrapper;
	this.gqlWrapper = gqlWrapper;
	this.serviceLayer = serviceLayer;

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
	}].concat(selected).map(x => Object.assign({},x));

	this.jobRunnerDefinitions={};
	this.installed.filter(x=>x.jobs).forEach(m => {
		if(m.jobs && !Array.isArray(m.jobs)) throw new Error(`invalid config for ${m.name} - jobs must be an array`);
		m.jobs.forEach(j => {
			const {type:job_type,run}=j;
			if(!job_type) throw new Error('job_type is required for job runner definitions');
			if(typeof run != 'function') throw new Error('job runner definition must have a .run function');
			if(this.jobRunnerDefinitions[job_type]) throw new Error('job runner definition already exists for: '+job_type);
			this.jobRunnerDefinitions[job_type] = j;
		});
	});
}

ModulesWrapper.fullModuleList=fullModuleList;

ModulesWrapper.prototype.getJobRunnerDefinition=function({job_type}) {
	if(!job_type) throw new Error('options.job_type is required');
	const def = this.jobRunnerDefinitions[job_type];
	if(!def) throw new Error('no job runner definition found for: '+job_type);
	return def;
}

ModulesWrapper.prototype.runMigrations=async function() {
	await this.sqlWrapper.waitForDatabase();
	await this.initialize({skip_associations:true});
	const {sequelize}=this.sqlWrapper;
	await sequelize.sync({
		alter: {
			drop: false
		}
	});
	// const nonShared = this.installed.filter(x=>!x.shared);
	// for(let x in nonShared) {
	// 	const m = nonShared[x];
	// 	let migrationsPath; // =m.migrationsPath||path.join(m.dir,'./migrations');
	// 	if(m.migrations) migrationsPath=m.migrations;
	// 	else if(!m.dir) throw new Error('no migrations specific, nor dir for: '+x);
	// 	else migrationsPath=path.join(m.dir,'./migrations');
	// 	await this.sqlWrapper.runMigrations(migrationsPath);
	// }
};

ModulesWrapper.prototype.initialize=function(opts) {
	if(this.initialized) throw new Error('already initialized');
	const{sqlWrapper}=this;
	this.installed.filter(x=>!x.shared).forEach(i => {
		const{models}=i;
		sqlWrapper.assembleModels(models, opts);
	});
	this.initialized = true;
	this.serviceLayer.initialize();
	console.log('permissions:',this.serviceLayer.getDefinedPermissions());
};

ModulesWrapper.prototype.getGql=function() {
	if(!this.initialized) throw new Error('must call initialize first');
	const{installed,sqlWrapper,serviceLayer,gqlWrapper}=this;
	const gqlParts = [];
	sqlWrapper.getTypes().forEach(type => {
		gqlParts.push(gqlWrapper.getModelDefsAndResolvers(type));
		gqlParts.push(gqlWrapper.getSaveDefAndResolvers(type));
	});

	installed.filter(x=>x.gql).forEach(x => {
		try {
			const r = x.gql({sqlWrapper,serviceLayer});
			if(Array.isArray(r)) r.forEach(y=>gqlParts.push(y));
			else gqlParts.push(r);
		} catch(e) {
			console.log('Failed for: ',x.name);
			throw e;
		}
	});
	return gqlParts.filter(x=>x);
};

ModulesWrapper.prototype.getEndpoints=async function() {
	const{installed,sqlWrapper}=this;
	const endpoints = [];
	await Promise.all(installed
		.filter(x=>x.getEndpoints)
		.map(async x=>{
			const arr = await x.getEndpoints({sqlWrapper});
			if(!arr) throw new Error('failed to get endpoints for: '+x.name);
			arr.forEach(y => {
				if(Array.isArray(y.method)) y.method.forEach(method => {
					endpoints.push(Object.assign({},y,{method}));
				})
				else endpoints.push(y);
			});
		}));
	return endpoints;
}

ModulesWrapper.prototype.close=function() {
	this.sqlWrapper.close();
}

module.exports=ModulesWrapper;
ModulesWrapper.buildFromEnv = async function() {
	require('dotenv').config();
	const sequelize = SqlWrapper.buildSequelizeFromEnv(true);
	const wrapper = new ModulesWrapper({
		sequelize,
		all_modules: true
	});
	await wrapper.initialize();
	return wrapper;
}
