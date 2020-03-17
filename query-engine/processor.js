const sqlstring=require('sqlstring');

function QueryProcessor(options) {
	const{sqlWrapper,query, model}=options;
	if(!sqlWrapper || !query || !model) throw new Error('sqlWrapper, query, and model all required');
	this.sqlWrapper=sqlWrapper;
	this.query=query;
	// base model
	this.model=model;
}

QueryProcessor.prototype.walkQuery=async function(walker) {
	function walk(node) {
		walker(node);
		if(node.type == 'and' || node.type == 'or') node.operands.forEach(walk);
	}
	walk(this.query);
};

QueryProcessor.prototype.mapQuery=async function(walker) {
	function map(node) {
		let children=[];
		if(node.type == 'and' || node.type == 'or') children = node.operands.map(x=>map(x));
		return walker(node,children);
	}
	return map(this.query);
};

QueryProcessor.prototype.analyzeQuery=async function() {
	const referencedModels = {};
	this.walkQuery(node => {
		if(node.condition) referencedModels[node.model]=1;
	});
	return {
		models: Object.keys(referencedModels),
	}
};

// http://jsonlogic.com/operations.html#
QueryProcessor.prototype.convertJsonLogicToSql=async function() {
	const tables = {};
	const convert = (node) => {
		if(Array.isArray(node)) return '('+node.map(convert).join(',')+')';
		if(typeof node != 'object') return sqlstring.escape(node);

		if(Object.keys(node).length != 1) throw new Error('invalid node:'+node);

		const k=Object.keys(node)[0];
		let v=node[k];
		if(!Array.isArray(v)) v=[v];

		switch(k) {
			// column acccess
			case 'var': {
				let[table,field]=v[0].split('.');
				if(!field) {
					field=table;
					table=null;
				} else tables[table]=1;
				const r = [table,field].filter(x=>!!x).map(x=>sqlstring.escapeId(x)).join('.');
				return r;
			}

			// control flow
			case 'if': {
				let parts = v.map(x=>convert(x));
				let elsePart;
				if(parts.length % 2==1) {
					parts = parts.slice(0,-1);
					elsePart = parts.slice(-1)[0];
				}

				let cases = [];
				for(let i=0; i<parts.length;i+=2) {
					const when=parts[i];
					const then=parts[i+1];
					cases.push(`when ${when} then ${then}`);
				}

				if(elsePart) cases.push(`else ${elsePart}`);

				return cases.concat('end').join(' ');
			}

			// boolean operators
			case '==':
			case '===':
				return `(${convert(v[0])} = ${convert(v[1])})`;
			case '!=':
			case '!==':
				return `(${convert(v[0])} <> ${convert(v[1])})`;
			case '!':
				return `(not ${convert(v[0])})`;
			case '!!':
				return `(${convert(v[0])} is not null)`;
			case 'or':
				return `(${v.map(x=>convert(x)).join(' or ')})`;
			case 'and':
				return `(${v.map(x=>convert(x)).join(' or ')})`;
			// arithmetic operations
			case '>':
			case '<':
			case '>=':
			case '<=':
			case '+':
			case '-':
			case '*':
			case '/':
				return `(${convert(v[0])} ${k} ${convert(v[1])})`;
			case 'between':
				return `(${convert(v[0])} between ${convert(v[1])} and ${convert(v[2])})`;
			// array operations
			case 'in':
				return `(${convert(v[0])} in ${convert(v[1])}`;
		}
		throw new Error('Unsupported JSONLogic operation:'+k);
	}
	const conditions = convert(this.query);
	return {tables:Object.keys(tables),conditions};
};

QueryProcessor.prototype.getSqlQuery=async function({fields}) {
	const {tables,conditions}=await this.convertJsonLogicToSql();
	const {sequelize}=this.sqlWrapper;
	const {model}=this;
	const models = (tables||[]).map(x=>sequelize.model(x));

	const associations = {};
	models.forEach(x => {
		const a = model.associations[x.name];
		if(!a) throw new Error('invalid association '+x.name);
		associations[x.name] = a.identifierField;
	});

	return [
		`select`,
		fields.map(sqlstring.escapeId),
		`from `+sqlstring.escapeId(model.tableName)+' as '+model.name,
		models.map(m => {
			return `${m.tableName} as ${m.name} on ${model.name}.id = ${m.tableName}.${associations[m.name]}`;
		}).join('\n'),
		'where',conditions
	].join('\n');
}

QueryProcessor.prototype.process=async function(options) {
	const sql = await this.getSqlQuery(options);
	const{sequelize}=this.sqlWrapper;
	const result = await sequelize.query(sql);
	return result[0];
};

module.exports=QueryProcessor;
