const Sequelize=require('sequelize');
const Umzug = require('umzug');
const fs=require('fs');
const through2=require('through2');
const es=require('event-stream');
const ContextAwareWrapper=require('./context-aware-wrapper');

function buildSequelize(options) {
	options = options || {};

	const {auth:{name,user,password,host,port}}=options;
	if([name,user,password,host,port].find(x=>!x)) {
		throw new Error('auth options (name,user,password,host,port) were not fully set');
	}

	return new Sequelize(name,user,password, {
		host,
		port,
		dialect: 'mysql',
		define: {
			freezeTableName: true,
			underscored: true
		},
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		}
	});
}

function Wrapper(options) {
	this.sequelize=options.sequelize||buildSequelize(options);
}
Wrapper.buildSequelize = buildSequelize;

let envSequelize;
Wrapper.buildSequelizeFromEnv = function() {
	if(envSequelize) return envSequelize;
	const {
		DATABASE_NAME:name,
		DATABASE_USER:user,
		DATABASE_PASSWORD:password,
		DATABASE_HOST:host,
		DATABASE_PORT:port
	} = process.env;
	envSequelize = buildSequelize({
		auth: {
			name,user,password,host,port
		}
	});
	return envSequelize;
};

Wrapper.prototype.waitForDatabase=async function(count) {
	if(count === undefined) count = 1;
	if(count === 10) throw new Error('database failed to come up after 5 waits');
	try {
		await this.sequelize.authenticate();
	} catch(e) {
		if(e.toString().indexOf('SequelizeConnectionRefusedError') == 0) {
			console.log(new Date(),'mysql not up, tries:',count);
			return new Promise((resolve,reject) => setTimeout(async () => {
				this.waitForDatabase(count+1).then(resolve).catch(reject);
			},1000*count));
		}
		console.log('index:',e.toString().indexOf('SequelizeConnectionRefusedError'));
		console.log(e);
		throw e;
	}
};

Wrapper.prototype.assembleModels=function(models) {
	const defined = this.defined = this.defined || {};

	if(!models) throw new Error('models is a required parameter');
	if(typeof models == 'object') models = Object.values(models);
	if(!models.length) throw new Error('models must be a non empty array or object');

	models = models.map(x => {
		if(typeof x == 'function') x = x({sqlWrapper:this});
		return x;
	});

	const {sequelize}=this;
	models.forEach(x => {
		const{name,fields,tableName}=x;

		if(defined[name]) throw new Error('model with name '+name+' already exists');

		if(!name||!fields) throw new Error('name and fields are required for each model');
		const model=sequelize.define(name,fields,{
			tableName: tableName||name,
			hooks: x.hooks||{},
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		});
		if(x.hooks) console.log(name+' has hooks '+Object.keys(x.hooks),model.hooks);
		defined[name]=Object.assign({},x,{model});
	});
	models.forEach(x => {
		if(x.associations) x.associations.forEach(a => {
			const {name,build}=a;
			if(!name) throw new Error('invalid association - name is required');
			const target = sequelize.model(name);
			if(!target) throw new Error('model does not exist');
			build(defined[x.name].model,target);
		});
	});
}


Wrapper.prototype.exportWithStream=function(model,options) {
	options=options||{};
	const stream = this.streamQuery(model,options);
	return new Promise((resolve,reject) => {
		stream.pipe(es.writeArray((e,r) => {
			if(e) return reject(e);
			resolve(r);
		}));
	});
}

const QUERY_STREAM_PAGE_SIZE=1000;
Wrapper.prototype.processPagedQuery=async function(model,options,handle) {
	if(typeof options == 'function' && !handle) {
		handle=options;
		options = null;
	}
	options=options||{};
	const {offset}=options;
	const findOptions = Object.assign({},options);
	delete findOptions.limit;
	const pageSize = options.pageSize || QUERY_STREAM_PAGE_SIZE;

	let total=0;
	let currentOffset=offset||0;

	async function processPage() {
		let page;
		page = await model.findAll(Object.assign({},findOptions,{
			limit: pageSize,
			offset: currentOffset
		}));
		if(!page.length) return;
		await handle(page);
		total+=page.length;
		// only one chain will be running through here, so it is safe
		// eslint-disable-next-line require-atomic-updates
		currentOffset+=page.length;
		return processPage();
	}

	await processPage();
	return {total};
}
Wrapper.prototype.streamQuery=function(model,options) {
	options=options||{};
	const {limit,offset}=options;
	const findOptions = Object.assign({},options);
	delete findOptions.limit;

	let total=0;
	let currentOffset=offset||0;
	const outStream=through2.obj();

	function endStream(e) {
		if(e) outStream.destroy(e);
		outStream.end();
	}

	async function streamPage() {
		let page;

		try {
			page = await model.findAll(Object.assign({},findOptions,{
				limit: QUERY_STREAM_PAGE_SIZE,
				offset: currentOffset
			}));
		} catch(e) {
			return endStream(e);
		}

		if(!page.length) return endStream();
		async function pushNext(a) {
			if(!a||!a.length) return;
			if(!outStream.write(a[0])) await new Promise((res,rej) => outStream.once('drain', (e) => {
				if(e) return rej(e); res(); }));
			total++;
			if(limit && total>=limit) return;
			pushNext(a.slice(1));
		}
		await pushNext(page);

		if(limit && total>=limit) return endStream();
		// only one chain will be running through here, so it is safe
		// eslint-disable-next-line require-atomic-updates
		currentOffset+=page.length;
		return streamPage();
	}

	streamPage();

	return outStream;
};

Wrapper.prototype.getModels=function() {
	return Object.values(this.defined).map(x=>x.model);
}

Wrapper.prototype.getModel=function(name) {
	return this.sequelize.model(name);
}

Wrapper.prototype.getTypes=function() {
	return Object.values(this.defined);
}

Wrapper.prototype.getType=function(name) {
	if(!this.defined[name]) throw new Error('type '+name+' does not exist or has not been registed');
	return this.defined[name];
}

Wrapper.prototype.getContextAwareWrapper=function(options) {
	options=Object.assign({},options,{sqlWrapper: this});
	return new ContextAwareWrapper(options);
};

Wrapper.prototype.runMigrations=async function(migrationsPath) {
	if(!migrationsPath) throw new Error('migrationsPath was not provided');
	const{sequelize}=this;
	const umzug = new Umzug({
		migrations: {
			// indicates the folder containing the migration .js files
			path: migrationsPath,
			// inject sequelize's QueryInterface in the migrations
			params: [ sequelize.getQueryInterface(), Sequelize ]
		},
		// indicates that the migration data should be store in the database
		// itself through sequelize. The default configuration creates a table
		// named `SequelizeMeta`.
		storage: 'sequelize',
		storageOptions: { sequelize }
	});
  await umzug.up();
}

Wrapper.prototype.confirmMigrations=async function(migrationsPath) {
	if(!migrationsPath) throw new Error('migrationsPath was not provided');
	const {sequelize}=this;
	let [results] = await sequelize.query('select * from SequelizeMeta');
	if(!results||!results.length) throw new Error('invalid migration data - please run migrations to update database');
	results = results.map(x=>x.name);
	const files = fs.readdirSync(migrationsPath);

	const missing = files.filter(x=>!results.find(y=>y==x));
	if(missing.length) throw new Error('missing '+missing.join(',')+' migrations');
}

Wrapper.prototype.validate=async function() {
	await this.confirmMigrations();
}

Wrapper.prototype.close=async function() {
	return await this.sequelize.close();
}

module.exports=Wrapper;
