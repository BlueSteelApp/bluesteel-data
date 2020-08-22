const sequelize=require('sequelize');
const {gql}=require('apollo-server-express');

const {STEAMENGINE_UPLOAD_URI}=process.env;

const models = {
	upload: {
		name: 'File',
		tableName: 'file',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: false,
			},
			file_path: {
				type: sequelize.TEXT(),
				allowNull :true
			},

		},
		allow_update: false,
		allow_create: false
	},
};

async function getEndpoints({sqlWrapper}) {
	const FileUpload = require('./upload');
	const fileUpload = new FileUpload({
		sqlWrapper: sqlWrapper,
		uploadFileTempDir: process.env.STEAMENGINE_UPLOAD_FILE_TMP_DIR
	});

	await fileUpload.initialize();

	return [{
		method: 'post',
		path: '/upload',
		handle: async (req,res) => {
			try {
				const upload = await fileUpload.uploadRequest({req,res});
				console.log('upload:',upload);
				const id=upload;
				res.status(200).jsonp({id});
			} catch(e) {
				console.error(e);
				res.status(500).jsonp('Failed to upload');
			}
		}
	}]
}

module.exports={
	name: 'Files',
	models,
	dir: __dirname,
	getEndpoints,
	gql: () => {
		const typeDefs=gql`
extend type Query {
	upload_uri: String!
}
`;
		const resolvers = {
			Query: {
				upload_uri: () => {
					if(!STEAMENGINE_UPLOAD_URI) throw new Error('STEAMENGINE_UPLOAD_URI is not set');
					return STEAMENGINE_UPLOAD_URI;
				}
			}
		};
		return {typeDefs,resolvers};
	}
};
