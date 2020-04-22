const sequelize=require('sequelize');
const {gql}=require('apollo-server-express');
const UploadImporter=require('../../import/upload-import');

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
			gql_one_way: true,
			build: (UploadImport,Job) => {
				UploadImport.hasOne(Job, {
					validate: false,
					foreignKey: 'job_definition_id',
					as: 'Job'
				});
			}
		}]
	}
};

module.exports={
	name:'Imports',
	dir: __dirname,
	models,
	jobs: [{
		type: "import",
		run: async (job, {sqlWrapper}) => {
			const UploadImport = sqlWrapper.getModel('UploadImport');
			const uploadImport = await UploadImport.findByPk(job.job_definition_id);
			if(!uploadImport) throw new Error('unable to load upload import for job '+job.id);
			const importer = new UploadImporter({sqlWrapper, uploadImport});
			return importer.run();
		}
	}],
	gql: ({sqlWrapper,sqlWrapper:{sequelize}}) => {
		const Job = sqlWrapper.getModel('Job');
		const Upload = sqlWrapper.getModel('Upload');
		const UploadImport = sqlWrapper.getModel('UploadImport');
		const typeDefs=gql`
		extend type Mutation {
			"""
			Creates the following objects:
			- Upload: allowing a user to upload a file to be import once complete
			- UploadImport: the configuration for importing the uploaded file
			- Job: status set to 'waiting'. will be set to 'queued' upon completion of the upload
			"""
			UploadImportJobCreate(label:String, import_type: String!): UploadImport

			"""
			Similar to UploadImportJobCreate, except it creates the UploadImport and Job
			based on a previously existing Upload. The Job will be set to "waiting" - it will not
			start until you explicitly call 'Mutation.JobStart'
			"""
			UploadImportCreate(label:String, import_type: String!, upload_id:ID!): UploadImport
		}`;
		const resolvers = {
			Mutation: {
				UploadImportCreate: async(root,{label,import_type,upload_id}) => sequelize.transaction(async transaction => {
					const upload = Upload.findByPk(upload_id);
					if(!upload) throw new Error('invalid upload_id: '+upload_id);

					const uploadImport = await UploadImport.create({
						label, upload_id: upload.id, import_type
					}, {transaction});

					await Job.create({
						type:'import',
						label:label+' Job',
						status:'waiting',
						job_definition_id: uploadImport.id
					}, {transaction});

					return uploadImport;
				}),
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
