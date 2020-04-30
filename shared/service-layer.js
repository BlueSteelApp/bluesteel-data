const DataLoader = require('dataloader');
const YasqlQueryRunner = require('./yasql-query');

function ServiceLayer({sqlWrapper, moduleWrapper}) {
	this.sqlWrapper = sqlWrapper;
	this.moduleWrapper = moduleWrapper;
}

ServiceLayer.prototype.getDefinedPermissions = function() {
	const permissions = {};
	Object.values(this.sqlWrapper.defined).forEach(x => {
		const defRoles = x.permissions;
		if(!defRoles) return;
		Object.values(defRoles).forEach(role => {
			permissions[role] = permissions[role] || {role,types:[]};
			permissions[role].types.push(x.name);
		});
	});
	return permissions;
};

ServiceLayer.prototype.getPermissionsForUser = async function(user_id) {
	const user = await this.User.findByPk(user_id);
	if(!user) throw new Error('user does not exist');
	const userSet = await user.getUserPermissionSet();
	if(!userSet) return {};

	const set = await userSet.getPermissionSet();
	const list = await set.getPermissionSetPermissions();
	const permissions = {};
	list.map(x => permissions[x.permission]=1);

	return permissions;
}

ServiceLayer.prototype.initialize = function() {
	const {defined} = this.sqlWrapper;
	this.User = this.sqlWrapper.getModel('User');

	this.factories = {};
	Object.values(defined).forEach(def => {
		const {
			name,
			model,
			permissions
		}=def;
		let {read,edit} = permissions || {};

		this.factories[name] = context => {
			if(!context) throw new Error('context is required');

			const loader = new DataLoader(async ids => {
				const records = await model.findAll({where: {id: ids}});
				return ids.map(id => records.find(y=>y.id == id));
			});
			const service = {
				model
			};
			context.serviceCache[name] = service;

			function assertRead() {
				if(!read) return;
				if(!context.permissions[read] && !context.permissions[edit]) throw new Error('you do not have the required read permission');
			}
			function assertEdit() {
				if(!edit) return;
				if(!context.permissions[edit]) throw new Error('you do not have the required edit permission');
			}
			function assertDelete() {
				assertEdit();
			}

			service.findByPk = async function(id) {
				assertRead();
				return loader.load(id);
			};
			service.find = service.findAll = async function(options) {
				assertRead();
				options = options || {};
				const records = await model.findAll(options);
				records.forEach(r => loader.prime(r.id,r));
				return records;
			};

			service.getYasqlQueryRunner = function(query) {
				assertRead();
				return new YasqlQueryRunner({
					sqlWrapper: this.sqlWrapper,
					target: this.type.name,
					query
				});
			};

			service.stats = async function(query) {
				assertRead();
				const invalidTargetStats = query.outputs.filter(x => x.target && x.target != name);
				if(invalidTargetStats.length) throw new Error('invalid stats - must be against '+name);
				query.conditions = query.conditions || [];
				const runner = this.getYasqlQueryRunner(query);
				const results = await runner.run();
				if(results.length != 1) throw new Error('must return a single row');
				const stats = results[0];
				return {
					query,
					results: Object.entries(stats)
						.map(([key,value]) => ({key,value}))
				};
			};

			service.findOrCreate = async function(object, options) {
				assertEdit();
				return model.findOrCreate(object,options);
			};

			service.save = async function(object, options) {
				assertEdit();
				let result;

				if(object.id) {
					const existing = await service.findByPk(object.id,options);
					if(!existing) throw new Error(`${object.id} does not exist`);
					// only update current fields
					Object.entries(object).filter(([x]) => object[x]).forEach(([key,value]) => {
						existing[key]=value;
					});
					await existing.save(options);
					result = existing;
				} else {
					result = await model.create(object,options);
				}

				return result;
			};
			service.delete = service.destroy = async function(id) {
				assertDelete();

				if(!id) throw new Error(`id is required for delete`);

				const o = await model.findByPk(id);
				if(!o) throw new Error('no object with id '+id+' found');

				await o.destroy();
			};

			return service;
		};
	});
};

ServiceLayer.prototype.getService = function(name, context) {
	if(!this.factories) throw new Error('service layer has not been initialized');
	if(!this.factories[name]) throw new Error('invalid service: '+name);
	context.serviceCache = context.serviceCache || {};
	if(context.serviceCache[name]) return context.serviceCache[name];
	return context.serviceCache[name] = this.factories[name](context);
};

module.exports=ServiceLayer;
