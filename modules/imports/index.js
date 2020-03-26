const sequelize=require('sequelize');
const {gql}=require('apollo-server-express');
const models = {
	upload_import: {
		name: 'UploadImport',
		tableName: 'upload_import',
		fields: {
			import_type: {
				type: sequelize.STRING(255),
				allowNull: false
			},
			import_raw_table: {
				type: sequelize.STRING(64),
			},
			upload_id: {
				type: sequelize.INTEGER(11),
				allowNull: false,
			},
			status: {
				type: sequelize.STRING(255),
				allowNull: true
			}
		},
		allow_update: false,
		allow_create: false,
		associations: [{
			name: 'Upload',
			build: (UploadImport,Upload) => {
				Upload.hasOne(UploadImport, {
					validate: false,
					foreignKey: 'upload_id',
					as: 'UploadImport'
				});
				UploadImport.belongsTo(Upload, {
					validate: false,
					through: 'upload_id',
					as: 'Upload'
				});
			}
		},{
			name: 'Job',
			build: (UploadImport,Job) => {
				UploadImport.hasOne(Job, {
					validate: false,
					foreignKey: 'job_definition_id',
					as: 'Job'
				});
				Job.belongsTo(UploadImport, {
					validate: false,
					targetKey: 'id',
					foreignKey: 'job_definition_id',
					as: 'UploadImport'
				});
			}
		}]
	}
};

module.exports={
	name:'Imports',
	dir: __dirname,
	models,
	gql: ({sqlWrapper,sqlWrapper:{sequelize}}) => {
		const Job = sqlWrapper.getModel('Job');
		const Upload = sqlWrapper.getModel('Upload');
		const UploadImport = sqlWrapper.getModel('UploadImport');
		const typeDefs=gql`
		extend type Mutation {
			UploadImportJobCreate(label:String, import_type: String!): UploadImport
		}`;
		const resolvers = {
			Mutation: {
				UploadImportJobCreate: async(root,{label,import_type}) => sequelize.transaction(async transaction => {
					label=label||'New Import';
					const upload = await Upload.create({
						label:label+' Upload'
					}, {transaction});

					const uploadImport = await UploadImport.create({
						label, upload_id: upload.id, import_type
					}, {transaction});

					const job = await Job.create({
						type:'import',
						label:label+' Job',
						status:'waiting',
						job_definition_id: uploadImport.id
					}, {transaction});

					upload.on_completed_job_id = job.id;
					await upload.save({transaction});

					return uploadImport;
				})
			}
		};
		return {
			typeDefs,
			resolvers
		};
	}
};
