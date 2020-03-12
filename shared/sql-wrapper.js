const Sequelize=require('sequelize');
const Umzug = require('umzug');
const fs=require('fs');
const through2=require('through2');
const es=require('event-stream');

function buildSequelize(options) {
	const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env;
	const {auth:{name,user,password}={
		name:DATABASE_NAME,
		user:DATABASE_USER,
		password:DATABASE_PASSWORD
	}}=options;
	if(!name||!user||!password) {
		if(!DATABASE_NAME||!DATABASE_USER||!DATABASE_PASSWORD) {
			throw new Error('process variables DATABASE_NAME, DATABASE_USER, or DATABASE_PASSWORD are not set');
		}
		throw new Error('auth overrides (name, user, or password) were not fully set');
	}
	return new Sequelize(name,user,password, {
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
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

function assembleModels(sequelize,options) {
	const defined = {};
	let {models}=options;
	if(!models) throw new Error('models is a required parameter');
	if(typeof models == 'object') models = Object.values(models);
	if(!models.length) throw new Error('models must be a non empty array or object');
	models.forEach(x => {
		if(typeof x == 'function') x = x();
		const{name,fields,tableName}=x;
		if(!name||!fields) throw new Error('name and fields are required for each model');
		const model=sequelize.define(name,fields,{
			tableName: tableName||name
		});
		defined[name]=Object.assign({},x,{model});
	});
	return defined;
}

function Wrapper(options) {
	this.sequelize=options.sequelize||buildSequelize(options);
	this.defined=assembleModels(this.sequelize,options);
	this.migrationsPath=options.migrationsPath;
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

Wrapper.prototype.getTypes=function() {
	return Object.values(this.defined);
}

Wrapper.prototype.runMigrations=async function() {
	if(!this.migrationsPath) throw new Error('migrationsPath was not set');
	const{sequelize}=this;
	const umzug = new Umzug({
		migrations: {
			// indicates the folder containing the migration .js files
			path: this.migrationsPath,
			// inject sequelize's QueryInterface in the migrations
			params: [ sequelize.getQueryInterface() ]
		},
		// indicates that the migration data should be store in the database
		// itself through sequelize. The default configuration creates a table
		// named `SequelizeMeta`.
		storage: 'sequelize',
		storageOptions: { sequelize }
	});
  await umzug.up();
  console.log('All migrations performed successfully');
	await sequelize.close();
}

Wrapper.prototype.confirmMigrations=async function() {
	const {sequelize}=this;
	let [results] = await sequelize.query('select * from SequelizeMeta');
	if(!results||!results.length) throw new Error('invalid migration data - please run migrations to update database');
	results = results.map(x=>x.name);
	console.log('confirmed',results.length,'migrations confirmed');
	const files = fs.readdirSync(this.migrationsPath);
	console.log('checking against',files);

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
