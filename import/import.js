const through2batch=require('through2-batch');
const through2=require('through2');
const es=require('event-stream');
const DataTypes=require('sequelize');//, {Op}=DataTypes;
const debug=require('debug')('import.js');

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
	this.sourceFields=options.sourceFields;

	if(!options.primaryType) options.primaryType='Person';
	this.primaryType=options.primaryType;
	this.importId=options.importId = options.importId || new Date().getTime();
	this.importTableName=options.importTableName = options.importTableName || `_import_${options.primaryType}_${options.importId}`;
}
ImportMapping.getStandardImportDefinitions=function() {
	return {
		Person: {
			sourceToTargetMap: [
				{source:'person_id',target:{field:'id'}},
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
ImportMapping.prototype.getSourceFieldForTarget=function({type,field}) {
	if(!type) type = this.primaryType;
	const match = this.options.sourceToTargetMap.find(x => {
		return x.target.field == field && (x.target.type||this.primaryType)==type;
	});
	if(!match) throw new Error('invalid field: '+type+'.'+field);
	return this.sourceFields.find(y=>y==match.source);
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
ImportMapping.prototype.getAllTargetFields=function() {
	const targets = [];
	this.sourceFields.forEach(field => {
		const perSource = this.getTargetsForSourceField(field);
		perSource.forEach(x=>targets.push(x));
	});
	return targets;
}
ImportMapping.prototype.getImportAssociations=function() {
	const{sqlWrapper}=this;
	const allTargets = this.getAllTargetFields();
	const perType = {};
	allTargets.forEach(x => {
		const type = x.type.name;
		(perType[type] = perType[type]||[]).push(x);
	});
	const {primaryType}=this;
	const associations = [];
	Object.entries(perType).map(([typeName,def]) => {
		const baseType = sqlWrapper.getType(typeName);
		const existingUnique=[];
		def.map(x => x.field).forEach(x=>{
			const temp = Object.assign({},baseType.fields[x]);
			if(temp.unique) existingUnique.push(x);
		});
		if(existingUnique.length) {
			const through = existingUnique[0];

			const primaryRefer = baseType.model.associations[primaryType];
			debug('associations',baseType.model.associations, primaryRefer);

			associations.push({
				type: baseType,
				model: baseType.model,
				foreignKey: through,
				targetKey: through,
				primaryRefer,
				reference: 'ExistingRecord_'+typeName
			});
		}
	});
	return associations;
};
ImportMapping.prototype.getBaseType=function() {
	return this.sqlWrapper.getType(this.primaryType);
}
ImportMapping.prototype.getImportModel=async function() {
	if(this.importModel) return this.importModel;
	const{importTableName}=this.options;
	const fields = this.getImportFields();

	const{sqlWrapper}=this;
	const importModel = this.importModel = await sqlWrapper.sequelize.define(importTableName,fields,{
		tableName:importTableName,
		timestamps:false
	});
	this.getImportAssociations().forEach(({type,foreignKey,targetKey,reference}) => {
		importModel.belongsTo(type.model, {foreignKey,targetKey,as:reference,constraints: false});
	});
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
	await sequelize.queryInterface.createTable(importMapping.importTableName, importFields);

	const importModel=await importMapping.getImportModel();

	await new Promise((resolve,reject) => {
		const s = stream.pipe(through2batch.obj({batchSize:IMPORT_RAW_BATCH_SIZE}))
			.pipe(through2.obj(function(batch,enc,cb) {
				importModel.bulkCreate(batch, {
					ignoreDuplicates: true,
					validate: true
				}).catch(e=>{
					console.error('error',e);
					cb(e);
				}).then(created=>{
					const ids = created.map(x=>x.id);
					ids.forEach(x=>this.push(x));
					cb();
				});
			}));
			s.pipe(es.writeArray((e,r) => {
				if(e) {
					console.error('failed:',e);
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
Importer.prototype.loadFromImportTable=async function() {
	const {importMapping,sqlWrapper}=this;
	const importModel = await importMapping.getImportModel();
	const baseType = await importMapping.getBaseType();
	const importAssociations = importMapping.getImportAssociations();

	debug('baseType:',baseType);
	let idField = Object.values(baseType.fields).find(x=>x.primaryKey);

	if(idField) idField = idField.field;
	else idField='id';

	const idSource = importMapping.getSourceFieldForTarget({field:idField, type:this.primaryType});
	if(!idSource) debug('No id source in import, appending id to all records');

	const idRefers = importAssociations.filter(a=>a.primaryRefer);
	debug('refers built using:',idRefers);

	await sqlWrapper.processPagedQuery(importModel, {
		include: importAssociations.map(x=>x.reference)
	}, async function(page) {
		const withId=[];
		const withoutId=[];
		page.forEach(b => {
			if(idSource && b[idSource]) withId.push(b);
			else withoutId.push(b);
		});

		const withRefer=[];
		const withBadRefer=[];
		const withoutRefer=[];
		const byRefer={};
		withoutId.forEach(x => {
			const refers={};
			idRefers.forEach(r => {
				const{reference}=r;
				if(x[reference]) refers[reference]=x[reference];
			});
			if(!Object.keys(refers).length) withoutRefer.push(x);
			else {
				const referValues = {};
				Object.values(refers).forEach(x=>referValues[x[idSource]]=1);
				if(Object.keys(referValues).length == 1) {
					x[idSource]=Object.keys(referValues)[0];
					withRefer.push(x);
				}
				else withBadRefer.push(x);
			}
		});
		console.log({
			withRefer, withBadRefer, withoutRefer
		});
	});
}
Importer.prototype.close=function() {
	this.wrapper.close();
};

module.exports=Importer;
