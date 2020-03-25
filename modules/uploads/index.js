const sequelize=require('sequelize');
const {gql}=require('apollo-server-express');
const { v4: uuid } = require('uuid');

const {BLUESTEEL_UPLOAD_URI}=process.env;

const models = {
	upload: {
		name: 'Upload',
		tableName: 'upload',
		hooks: {
			beforeValidate: async (instance) => {
				if(!instance.filename) instance.filename = uuid();
				if(!instance.status) instance.status='waiting';
			}
		},
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: false,
			},
			filename: {
				type: sequelize.STRING(255),
				allowNull: false,
			},
			file_path: {
				type: sequelize.TEXT(),
				allowNull :true
			},
			status: {
				type: sequelize.ENUM(),
				allowNull: false,
				values: ['waiting','started','complete']
			},

			on_finish_job_id: {
				type: sequelize.INTEGER(11),
				allowNull: true
			},

			started_at: {
				type: sequelize.DATE,
				allowNull: true
			},
			completed_at: {
				type: sequelize.DATE,
				allowNull: true
			}
		},
		allow_update: false,
		allow_create: false,
		associations: [{
			name: 'Job',
			build: (Upload,Job) => {
				Upload.belongsTo(Job, {
					validate: false,
					through: 'on_finish_job_id',
					as: 'OnFinishJob'
				});
				Job.hasOne(Upload, {
					validate: false,
					foreignKey: 'on_finish_job_id',
					as: 'TriggeringUpload'
				});
			},
			aliases: ['TriggeringUpload', 'OnFinishJob']
		}]
	},
};

module.exports={
	name: 'Uploads',
	models,
	dir: __dirname,
	gql: ({sqlWrapper}) => {
		const Upload=sqlWrapper.getModel('Upload');
		const typeDefs=gql`

extend type Upload {
	post_uri: String!
}
extend type Mutation {
	# Represents a file that a user has uploaded, or plans to upload.
	UploadCreate(label:String!): Upload
}
		`;
		const resolvers = {
			Upload: {
				post_uri: ({id}) => {
					if(!BLUESTEEL_UPLOAD_URI) throw new Error('BLUESTEEL_UPLOAD_URI is not set');
					return BLUESTEEL_UPLOAD_URI+'/'+id;
				}
			},
			Mutation: {
				UploadCreate: async (root,{label}) => {
					const result = await Upload.create({
						label,status:'waiting'
					});
					return result;
				}
			}
		};
		return {typeDefs,resolvers};
	}
};
