const yasql = require('yasql');
const sqlstring=require('sqlstring');
const through2=require('through2');
const async=require('async');

const typeDefs = `

type BlueSteelQueryComponent {
	and: [BlueSteelQueryComponent]
	or: [BlueSteelQueryComponent]

	"""
	The type that this output/having is run against. It will default to the target
	specified by the parent query
	"""
	target: String

	"""
	Field name in the result. Currently only used for outputs.
	"""
	name: String

	"""
	The yasql expression run against the target specified. Should evaluate to a
	single value, ie count(*) or concat(x,y)
	"""
	expression: String

	"""
	Narrows the results of this expression - only to be used if the target
	is different from the base type
	"""
	having: String
}

type BlueSteelQuery {
	outputs: [BlueSteelQueryComponent]
	conditions: [BlueSteelQueryComponent]
}

type QueriedStatResult {
	key: String
	value: String
}

type QueriedStats {
	query: BlueSteelQuery
	results: [QueriedStatResult]
}

"""
See documentation for BlueSteelQueryComponent
"""
input BlueSteelQueryComponentInput {
	and: [BlueSteelQueryComponentInput]
	or: [BlueSteelQueryComponentInput]

	name: String

	expression: String
	having: String

	"""
	The type that this output/having is run against. It will default to the target
	specified by the parent query
	"""
	target: String
}
input BlueSteelQueryInput {
	outputs: [BlueSteelQueryComponentInput]
	conditions: [BlueSteelQueryComponentInput]
}
`;

function YasqlQueryRunner(options) {
	const{sqlWrapper, query, target}=options;
	if(!sqlWrapper || !query) throw new Error('sqlWrapper and query are required');
	const {outputs,conditions}=query;
	if(!outputs || !conditions) throw new Error('query.outputs and query.conditions and required');
	if(!target) throw new Error('target is required');
	const type = sqlWrapper.getType(target);

	this.sqlWrapper = sqlWrapper;
	this.query = query;
	this.type = type;
}
YasqlQueryRunner.typeDefs = typeDefs;

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

	if(!raw.expression && !raw.having) throw new Error('nodes must have expression and/or having');

	const parsed_output = raw.expression && yasql.parse(raw.expression);
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
	return Promise.all(this.query.outputs.map(x => this.getSqlDefinition(x)));
}

YasqlQueryRunner.prototype.getSqlConditions = async function() {
	const parseCond = async (cond) => {
		const children = cond.or || cond.and;
		if(children) {
			const subParts = await Promise.all(children.map(x => parseCond(x)));
			let type;
			if(cond.or) type = 'or';
			else type = 'and';
			return {
				type,
				children: subParts
			}
		}
		return this.getSqlDefinition(cond);
	}
	return Promise.all(this.query.conditions.map(parseCond));
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

YasqlQueryRunner.prototype.getCount=async function() {
	const def = await this.getFullDefinition();
	const baseTable = this.type.name;
	const rawTable = this.type.tableName;

	const conditions = (await Promise.all(def.conditions.map(async x => {
		return this.defToSql(x);
	})));

	let conditionSql = '';
	if(conditions.length) conditionSql = 'where '+conditions.join(' or ');

	const sql = [
		`select`,
		`count(*) as query_count`,
		`from ${sqlstring.escapeId(rawTable)} ${sqlstring.escapeId(baseTable)}`,
		conditionSql
	].filter(x=>x).join(' ');

	const result = await this.sqlWrapper.runRawQuery({sql});
	return result[0].query_count;
}

YasqlQueryRunner.prototype.getSql=async function(options) {
	options = options || {};
	const{limit}=options;
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

	let limitSql = '';
	if(limit != null && !isNaN(limit)) {
		limitSql=`limit ${parseInt(limit)}`;
		console.log('Using limit:',limit,limitSql,parseInt(limit));
	}

	return [
		`select`,
		outputSql,
		`from ${sqlstring.escapeId(rawTable)} ${sqlstring.escapeId(baseTable)}`,
		conditionSql,
		limitSql
	].filter(x=>x).join(' ');
}

const STREAM_PAGE_SIZE = 1000;
YasqlQueryRunner.prototype.getStream = async function(options) {
	options = options || {};
	const pageSize = options.pageSize || STREAM_PAGE_SIZE;
	const sql = await this.getSql();
	const stream = through2.obj();
	const page = async (offset) => {
		offset = offset || 0;
		const pagedSql = sql+` limit ${offset},${pageSize}`;
		const rows = await this.sqlWrapper.runRawQuery({sql: pagedSql});

		await async.eachSeries(rows, (row,cb) => {
			if(!stream.write(row)) return stream.once('drain', cb);
			else cb();
		});
		if(rows.length < pageSize) {
			stream.end();
			return;
		}
		return page(offset+pageSize);
	};
	page(0);
	return stream;
}

YasqlQueryRunner.prototype.loadToTable=async function({table}) {
	const sql = await this.getSql();
	return this.sqlWrapper.runRawQuery({
		sql: `insert into ${sqlstring.escapeId(table)} ${sql}`
	});
}

YasqlQueryRunner.prototype.run = async function(opts) {
	let {limit}=(opts || {})
	const sql = await this.getSql({limit});
	return this.sqlWrapper.runRawQuery({sql});
}

module.exports=YasqlQueryRunner;
