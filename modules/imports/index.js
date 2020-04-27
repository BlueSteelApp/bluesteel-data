const sequelize=require('sequelize');
const {gql}=require('apollo-server-express');

const models = {
	upload_import: {
		name: 'FileImport',
		tableName: 'file_import',
		fields: {
			import_type: {
				type: sequelize.STRING(255),
				allowNull: false
			},
			import_raw_table: {
				type: sequelize.STRING(64),
			},
			file_id: {
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
			name: 'File',
			options: {
				type: 'OneToOne',
				source_field: 'file_id'
			}
		},{
			name: 'Job',
			gql_one_way: true,
			build: (FileImport,Job) => {
				FileImport.hasOne(Job, {
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
			const FileImporter = require('./file-import');
			const FileImport = sqlWrapper.getModel('FileImport');
			const fileImport = await FileImport.findByPk(job.job_definition_id);
			if(!fileImport) throw new Error('unable to load file import for job '+job.id);
			const importer = new FileImporter({sqlWrapper, fileImport});
			return importer.run();
		}
	}],
	gql: ({sqlWrapper,sqlWrapper:{sequelize}}) => {
		const Job = sqlWrapper.getModel('Job');
		const File = sqlWrapper.getModel('File');
		const FileImport = sqlWrapper.getModel('FileImport');
		const typeDefs=gql`
		extend type Mutation {
			"""
			Creates the FileImport and Job based on an uploaded file. The Job will be
			set to "waiting" - it will not start until you explicitly call 'Mutation.JobStart'
			"""
			FileImportCreate(label:String, import_type: String!, file_id:ID!): FileImport
		}`;
		const resolvers = {
			Mutation: {
				FileImportCreate: async(root,{label,import_type,file_id}) => sequelize.transaction(async transaction => {
					const file = File.findByPk(file_id);
					if(!file) throw new Error('invalid file_id: '+file_id);

					const fileImport = await FileImport.create({
						label, file_id: file.id, import_type
					}, {transaction});

					await Job.create({
						type:'import',
						label:label+' Job',
						status:'waiting',
						job_definition_id: fileImport.id
					}, {transaction});

					return fileImport;
				})
			}
		};
		return {
			typeDefs,
			resolvers
		};
	}
};
