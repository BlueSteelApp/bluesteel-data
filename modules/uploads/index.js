const sequelize=require('sequelize');
const {gql}=require('apollo-server-express');
const { v4: uuid } = require('uuid');

const {BLUESTEEL_UPLOAD_URI}=process.env;

const models = {
	upload: {
		name: 'Upload',
		tableName: 'upload',
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
		allow_create: false
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
			createUpload(label:String!): Upload
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
				createUpload: async (root,{label}) => {
					const result = await Upload.create({
						label,status:'waiting', filename: uuid()
					});
					return result;
				}
			}
		};
		return {typeDefs,resolvers};
	}
};
