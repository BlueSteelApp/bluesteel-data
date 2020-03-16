const SqlWrapper=require('./sql-wrapper');
const GqlWrapper=require('./gql-wrapper');

function ModuleWrapper(options) {
	let {models,migrations,sequelize,name}=options;

	if(!models) throw new Error('no models (path or obj) defined in options');
	if(!migrations) throw new Error('no migrations (path) defined in options');
	if(!name) throw new Error('no name defined in options');

	this.options=options;
	this.name=options.name;

	const sqlWrapper=this.sqlWrapper = new SqlWrapper({
		sequelize,
		models,
		migrationsPath: migrations
	});
	this.gqlWrapper = new GqlWrapper({sqlWrapper});
}

ModuleWrapper.prototype.init=function() {
	if(this.initialized == true) return;
	const{gql:gqlFn}=this.options;
	if(gqlFn) {
		if(typeof gqlFn != 'function') throw new Error('options.gql should be function accepting {sqlWrapper,gqlWrapper}');
		const {gqlWrapper,sqlWrapper}=this;
		const gql = gqlFn({gqlWrapper,sqlWrapper});
		this.gql = gql;
	}
	this.initialized == true;
}

ModuleWrapper.SqlWrapper=SqlWrapper;
ModuleWrapper.GqlWrapper=GqlWrapper;

module.exports=ModuleWrapper;
