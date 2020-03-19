const through2batch=require('through2-batch');
const through2=require('through2');
const es=require('event-stream');
const DataTypes=require('sequelize');//, {Op}=DataTypes;

/**
	Import Mapping map example:

	base type: 'Person'

	sourceToTargetMap: [
		{source: 'given_name': target:{field:'given_name'}}
		{source: 'email', target:{type: 'PersonEmail', field: 'email'}}
		{source: 'email2', target:{type: 'PersonEmail', field: 'email'}}
		{source: 'home_phone', target:{type: 'PersonPhone', field: 'phone'}}
	]
**/
function ImportMapping(sqlWrapper,options) {
	this.sqlWrapper=sqlWrapper;
	if(!this.sqlWrapper) throw new Error('sqlWrapper is required');
	this.options=options=Object.assign({},options||{});

	if(!options.sourceToTargetMap) throw new Error('options.sourceToTargetMap is required');

	if(!Array.isArray(options.sourceToTargetMap)) throw new Error('options.sourceToTargetMap must be an array of obj');

	if(!options.sourceFields) throw new Error('options.sourceFields is required');

	// validate all source fields are present
	const missingMapping = options.sourceFields.filter(x => !options.sourceToTargetMap.find(y=>y.source == x));
	if(missingMapping.length) throw new Error('missing mapping for source field '+missingMapping.join(','));

	// keep it small for now (perfectly arbitrary)
	if(options.sourceFields.length > 30) throw new Error('cannot import over 30 fields at once');

	if(!options.primaryType) options.primaryType='Person';
	this.importId=options.importId = options.importId || new Date().getTime();
	this.importTableName=options.importTableName = options.importTableName || `_import_${options.primaryType}_${options.importId}`;
}
ImportMapping.getStandardImportDefinitions=function() {
	return {
		Person: {
			sourceToTargetMap: [
				{source:'id',target:{field:'person_id'}},
				{source:'given_name', target:{field:'given_name'}},
				{source:'family_name', target:{field:'family_name'}},
				{source:'source_code', target:{field:'source_code'}},
				{source:'email', target: {type:'PersonEmail',field:'email'}},
				{source:'phone', target: {type:'PersonPhone',field:'phone'}}
			],
			deferenceFields: ['id','email','phone']
		}
	};
};
ImportMapping.prototype.getTargetsForSourceField=function(sourceField) {
	const {sqlWrapper,options}=this;
	const m = this.options.sourceToTargetMap.filter(x => x.source == sourceField);
	if(!m.length) throw new Error('no valid target defined for '+sourceField);

	const rawTargets = m.map(x=>x.target);

	const {primaryType:primaryTypeName}=options;
	const primaryType = sqlWrapper.getType(primaryTypeName);

	const targets = rawTargets.map(x => {
		let {type:typeName,field} = x;
		const type = typeName ? sqlWrapper.getType(typeName) : primaryType;
		if(field != 'id' && !type.fields[field]) throw new Error('invalid field '+field+' for type '+typeName);
		const model = sqlWrapper.getModel(type.name);
		return {type,field,model};
	});

	return targets;
}
ImportMapping.prototype.getPrimaryDereferences=function() {
	if(this.options.primaryDereferences) {
		const targets = [];
		this.options.primaryDereferences.forEach(field =>
			this.getTargetsForSourceField(field).forEach(x=>targets.push(x))
		);
	}
}
ImportMapping.prototype.getImportFields=function() {
	const importFields = Object.assign({}, {
		import_row_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		import_result: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	});
	this.options.sourceFields.forEach(x => {
		importFields[x] = {
			type: DataTypes.STRING(255),
			allowNull: true
		};
	});
	return importFields;
}
ImportMapping.prototype.getImportModel=async function() {
	if(this.importModel) return this.importModel;
	const{importTableName}=this.options;
	const fields = this.getImportFields();
	const model = {
		name: importTableName,
		tableName: importTableName,
		fields
	};
	console.log(model);
	const{sqlWrapper}=this;
	this.importModel = await sqlWrapper.sequelize.define(importTableName,fields,{
		tableName:importTableName,
		timestamps:false
	});
	// this.importModel=sqlWrapper.getModel(importTableName);
	return this.importModel;
}

function Importer({sqlWrapper,importMapping}) {
	this.sqlWrapper=sqlWrapper;
	this.importMapping=importMapping;
}
Importer.ImportMapping=ImportMapping;
Importer.Importer=Importer;
const IMPORT_RAW_BATCH_SIZE=1000;
Importer.prototype.loadImportTableFromStream=async function({stream}) {
	if(!stream)throw new Error('stream is required');
	const{sqlWrapper,importMapping}=this;

	const{sequelize}=sqlWrapper;
	const importFields = importMapping.getImportFields();
	console.log();
	await sequelize.queryInterface.createTable(importMapping.importTableName, importFields);

	const importModel=await importMapping.getImportModel();

	await new Promise((resolve,reject) => {
		const s = stream.pipe(through2batch.obj({batchSize:IMPORT_RAW_BATCH_SIZE}))
			.pipe(through2.obj(function(batch,enc,cb) {
				importModel.bulkCreate(batch, {
					ignoreDuplicates: true,
					validate: true
				}).catch(e=>{
					console.log('error',e);
					cb(e);
				}).then(created=>{
					const ids = created.map(x=>x.id);
					ids.forEach(x=>this.push(x));
					cb();
				});
			}));
			s.pipe(es.writeArray((e,r) => {
				if(e) {
					console.log('failed:',e);
					return reject(e);
				}
				resolve(r);
			}));
		});

	return {loaded:true};
};
Importer.prototype.getImportOverview=async function(options) {
	const {importModel} = this.getImportType(options);
	const total_count = await importModel.count({});
	return {
		total_count
	};
}
const IMPORT_BATCH_SIZE=1000;
Importer.prototype.loadFromImportTable=async function(options) {
	const {sequelize,wrapper}=this;
	const {importModel,existing} = await this.getImportType(options);

	const ignoreExisting=options.ignoreExisting||true;

	return sequelize.transaction(async transaction => {
		await new Promise((resolve,reject) => wrapper.streamQuery(importModel, {
			transaction,
			include: 'existingRecord'
		}).pipe(through2batch.obj({batchSize:IMPORT_BATCH_SIZE}))
			.pipe(through2.obj((batch,enc,cb) => {
				const creates = batch.filter(x=>!x.existingRecord).map(x=>x.dataValues);
				existing.bulkCreate(creates, {
					validate: true,
					transaction
				}).catch(e=>cb(e))
					.then((r)=>{
						if(ignoreExisting) return cb(null,r);
						throw new Error('unable to update at this time');
					});
			})).pipe(es.writeArray((e,r) => {
				if(e) return reject(e);
				resolve(r);
			})));
	});
}
Importer.prototype.close=function() {
	this.wrapper.close();
};

module.exports=Importer;
