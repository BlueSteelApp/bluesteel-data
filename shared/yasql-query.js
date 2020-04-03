const yasql = require('yasql');
const sqlstring=require('sqlstring');

function YasqlQueryRunner(options) {
	const{sqlWrapper, query, target}=options;
	if(!sqlWrapper || !query) throw new Error('sqlWrapper and query are required');
	const {output,condition}=query;
	if(!output || !condition) throw new Error('query.output and query.condition and required');
	if(!target) throw new Error('target is required');
	const type = sqlWrapper.getType(target);

	this.sqlWrapper = sqlWrapper;
	this.query = query;
	this.type = type;
}

YasqlQueryRunner.prototype.getHandlers = function() {
	const baseTable = this.type.name;
	return {
		baseTable,
		fieldFn: x => sqlstring.escapeId(x),
		valueFn: x => sqlstring.escape(x),
		tableFn: x => sqlstring.escapeId(x),
		functions: {}
	};
}

YasqlQueryRunner.prototype.getSqlDefinition = async function(raw) {
	// const handlers = this.getHandlers();
	const baseTable = this.type.name;

	if(!raw.output && !raw.having) throw new Error('nodes must have output and/or having');

	const parsed_output = raw.output && yasql.parse(raw.output);
	const parsed_having = raw.having && yasql.parse(raw.having);

	const allRefsByTable = [];
	if(parsed_output) allRefsByTable.push(yasql.getRefsByTable(parsed_output));
	if(parsed_having) allRefsByTable.push(yasql.getRefsByTable(parsed_having));

	const tables = {};
	allRefsByTable.forEach(x => Object.assign(tables,x));

	const name = raw.name;
	return {
		target: raw.target || baseTable,
		parsed_output,
		parsed_having,
		name,
		tables
	};
}

YasqlQueryRunner.prototype.getSqlOutputs = async function() {
	return Promise.all(this.query.output.map(x => this.getSqlDefinition(x)));
}

YasqlQueryRunner.prototype.getSqlConditions = async function() {
	const parseCond = async (cond) => {
		const children = cond.$or || cond.$and;
		if(children) {
			const subParts = await Promise.all(children.map(x => parseCond(x)));
			let type;
			if(cond.$or) type = 'or';
			else type = 'and';
			return {
				type,
				children: subParts
			}
		}
		return this.getSqlDefinition(cond);
	}
	return Promise.all(this.query.condition.map(parseCond));
}

YasqlQueryRunner.prototype.getFullDefinition = async function() {
	const outputs = await this.getSqlOutputs();
	const conditions = await this.getSqlConditions();
	const tables = {[this.type.name]:1};
	outputs.forEach(x => Object.assign(tables,x.tables));
	return {outputs, conditions, tables};
}

YasqlQueryRunner.prototype.getAssociationWhereSql=async function(def) {
	const {type}=this;
	const {model}=type;

	const {target}=def;

	const association = model.associations[target];
	if(!association) throw new Error('Failed assocation between '+this.type.name+' and '+target);

	const matchField = association.identifierField;
	return `${sqlstring.escapeId(type.name)}.id = ${sqlstring.escapeId(target)}.${sqlstring.escapeId(matchField)}`;
}

YasqlQueryRunner.prototype.defToSql=async function(def) {
	if(def.type == 'and' || def.type == 'or') {
		const children = await Promise.all(def.children.map(x=>this.defToSql(x)));
		return `(${children.join(' '+def.type+' ')})`;
	}

	const baseTable=this.type.name;

	const{target,parsed_output,parsed_having,name}=def;
	const handlers = this.getHandlers();
	handlers.baseTable = target;

	let sqlOutput = parsed_output && yasql.toSql(handlers,parsed_output);
	let sqlHaving = parsed_having && yasql.toSql(handlers,parsed_having);

	let finalSql;

	if(sqlOutput && !sqlHaving && (target == baseTable)) finalSql = sqlOutput;
	else {
		const where = [
			await this.getAssociationWhereSql(def)
		];
		if(sqlHaving) where.push(sqlHaving);

		const type = this.sqlWrapper.getType(target);

		const tail = [
			`from ${sqlstring.escapeId(type.tableName)} ${sqlstring.escapeId(target)}`,
			`where`,
			where.join(' and ')
		].filter(x=>x).join(' ');

		if(sqlOutput) {
			finalSql = `(select ${sqlOutput} ${tail})`;
		} else {
			finalSql = `(exists (select * ${tail}))`;
		}
	}

	if(name) finalSql = finalSql + ' as ' + sqlstring.escapeId(name);

	return finalSql;
}

YasqlQueryRunner.prototype.getSql=async function() {
	const def = await this.getFullDefinition();
	const baseTable = this.type.name;
	const rawTable = this.type.tableName;

	const outputSql = (await Promise.all(def.outputs.map(async x => {
		return this.defToSql(x);
	}))).join(', ');

	const conditions = (await Promise.all(def.conditions.map(async x => {
		return this.defToSql(x);
	})));

	let conditionSql = '';
	if(conditions.length) conditionSql = 'where '+conditions.join(' or ');

	return [
		`select`,
		outputSql,
		`from ${sqlstring.escapeId(rawTable)} ${sqlstring.escapeId(baseTable)}`,
		conditionSql
	].filter(x=>x).join(' ');
}

YasqlQueryRunner.prototype.run = async function() {
}

module.exports=YasqlQueryRunner;
