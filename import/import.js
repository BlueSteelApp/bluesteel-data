const CsvStreamer=require('./csv');
const through2batch=require('through2-batch');
const through2=require('through2');
const es=require('event-stream');
const DataTypes = require('sequelize');

function Importer(wrapper) {
	const {sequelize}=wrapper;
	this.wrapper=wrapper;
	this.sequelize=sequelize;
	if(!sequelize) throw new Error('sequelize and models required');
	let progress = {
		processed: 0
	};
	this.validate = () => wrapper.validate();
	this.getProgess=function() {
		return Object.assign(progress,{});
	};
	this.setProgress=function(p) {
		progress = p;
	};
}

Importer.prototype.getImportType=function(options) {
	const{sequelize,wrapper}=this;
	const{type,importTableName}=options||{};
	if(!type||!importTableName) throw new Error('type and importTableName are required');

	const typeDef = wrapper.getTypes().find(x=>x.name==type);
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
	}, typeDef.fields);

	const importModel = sequelize.define(importTableName, importFields, {
		timestamps: false
	});
	const uniqueKeys = Object.keys(typeDef.fields).filter(x => {
		const field = typeDef.fields[x];
		return field.unique;
	});
	// define the model to include a reference to existing records, so we can compare
	importModel.belongsTo(typeDef.model, {
		foreignKey: uniqueKeys[0],
		targetKey: uniqueKeys[0],
		as: 'existingRecord',
		// having no constraints gives us freedom to have records _without_ a match
		constraints: false
	});

	return {importModel,importFields,existing:typeDef.model};
}

const IMPORT_RAW_BATCH_SIZE=1000;
Importer.prototype.loadImportTableFromStream=async function(options) {
	const{sequelize}=this;
	const{type,stream}=options||{};
	if(!type||!stream) throw new Error('type and stream are required');

	const importId=options.importId || type+'_'+(new Date()).getTime().toString();
	const importTableName = options.importTableName||'_import_'+importId;
	const {importModel,importFields,existing} = this.getImportType({type,importId,importTableName});

	await sequelize.transaction(async transaction => {
		await sequelize.queryInterface.createTable(importTableName, importFields);
		return new Promise((resolve,reject) => {
			const s = stream.pipe(through2batch.obj({batchSize:IMPORT_RAW_BATCH_SIZE}))
				.pipe(through2.obj(function(batch,enc,cb) {
					importModel.bulkCreate(batch, {
						ignoreDuplicates: true,
						validate: true,
						transaction
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
	});
	return {
		importModel,
		importTableName,
		existing
	};
};

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

Importer.prototype.importCsv=async function(options) {
	options=options||{};
	const csv=new CsvStreamer(this);
	const stream = await csv.getStream(options);
	options=Object.assign({},options,{stream});
	const{importTableName}=await this.loadImportTableFromStream(options);
	const finalOptions = Object.assign({},options,{importTableName});
	await this.loadFromImportTable(finalOptions);
}

Importer.prototype.close=function() {
	this.wrapper.close();
};

module.exports=Importer;
