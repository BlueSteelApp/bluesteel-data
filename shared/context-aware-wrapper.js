const DataLoader = require('dataloader');
const YasqlQueryRunner = require('./yasql-query');

function ContextAwareType({type,model,user, sqlWrapper}) {
	this.user=user;
	this.type=type;
	this.model=model;
	if(!user) throw new Error('user is a required option');
	this.user_id = user.id;
	this.sqlWrapper=sqlWrapper;
}
ContextAwareType.prototype.getPkDataLoader=function() {
	if(this.pkDataloader) return this.pkDataloader;
	const{model}=this.model;
	return this.pkDataloader = new DataLoader(async (ids) => {
		const bulk = await model.findAll({
			where: {id: ids}
		});
		const byId = {};
		bulk.forEach(x=>byId[x.id]=x);
		const results = ids.map(x=>byId[x]);
		return results;
	});
};
ContextAwareType.prototype.findOrCreate=async function(options) {
	// if(!options.defaults) throw new Error('defaults is a required option');
	if(!options.where) throw new Error('where is a required option');
	options.defaults = options.defaults || {};
	if(this.type.fields.created_by) {
		options.defaults.created_by = this.user_id;
		options.defaults.updated_by = this.user_id;
	}
	return this.model.findOrCreate(options);
}
ContextAwareType.prototype.findByPk=async function(id,options) {
	return this.getPkDataLoader().load(id,options);
}
ContextAwareType.prototype.save=async function(record,options) {
	const{user_id,model,type}=this;
	let result;
	if(record.id) {
		const existing = await model.findByPk(record.id,options);
		if(!existing) throw new Error(`${type.name} does not exist`);
		// only update current fields
		Object.entries(record).filter(([x]) => type.fields[x]).forEach(([key,value]) => {
			existing[key]=value;
		});
		if(type.fields.created_by) existing.created_by = user_id;
		if(type.fields.updated_by) existing.updated_by = user_id;
		await existing.save(options);
		result = existing;
	} else {
		if(type.fields.updated_by) record.updated_by=user_id;
		result = await model.create(record,options);
	}
	return result;
}
ContextAwareType.prototype.getYasqlQueryRunner=function(query) {
	return new YasqlQueryRunner({
		sqlWrapper: this.sqlWrapper,
		target: this.type.name,
		query
	});
}
ContextAwareType.prototype.runYasqlQuery=async function(query) {
	const runner = this.getYasqlQuery(query);
	const [rows,metadata] = await runner.run();
	return {rows,metadata};
}
ContextAwareType.prototype.transaction=async function(cb) {
	return this.sqlWrapper.sequelize.transaction(async transaction => {
		const result = await cb(transaction);
		return result;
	});
}

function ContextAwareWrapper(options) {
	if(!options) throw new Error('options is a required parameter');

	const {user, sqlWrapper}=options;
	if(!user||!sqlWrapper) throw new Error('user and sqlWrapper are required options');

	this.user=user;
	this.sqlWrapper=sqlWrapper;

	this.typeCache={};
}
ContextAwareWrapper.prototype.forType=function(t) {
	if(this.typeCache[t]) return this.typeCache[t];

	const type=this.sqlWrapper.getType(t);
	const model=this.sqlWrapper.getModel(t);

	this.typeCache[t]=new ContextAwareType({user:this.user,type,model, sqlWrapper: this.sqlWrapper});
	return this.typeCache[t];
};

module.exports=ContextAwareWrapper;
ContextAwareWrapper.ContextAwareType=ContextAwareType;
