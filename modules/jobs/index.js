const sequelize=require('sequelize');
const {gql}=require('apollo-server-express');

const models = {
	job: {
		name: 'Job',
		tableName: 'job',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: false,
			},

			type: {
				type: sequelize.ENUM,
				values: ['import'],
				allowNull: false,
			},
			job_definition_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},

			status: {
				type: sequelize.ENUM,
				values: ['waiting','queued','started','completed','errored'],
				allowNull: false
			},

			started_at: {
				type: sequelize.DATE,
				allowNull: true
			},
			completed_at: {
				type: sequelize.DATE,
				allowNull: true
			},
			errored_at: {
				type: sequelize.DATE,
				allowNull: true
			}
		},
		allow_update: false,
		allow_create: false
	},
	job_data: {
		name: 'JobData',
		tableName: 'job_data',
		fields: {
			job_id: {
				type: sequelize.INTEGER(11),
				allowNull: false,
				unique: true
			},
			output: {
				type: sequelize.TEXT(),
				allowNull: true
			},
			error_message: {
				type: sequelize.TEXT(),
				allowNull: true
			}
		},
		associations: [{
			name:'Job',
			build: (JobData,Job) => {
				JobData.belongsTo(Job,{
					validate:false,
					through:'job_id',
					as: 'Job'
				});
				Job.hasOne(JobData,{
					validate:false,
					foreignKey: 'job_id',
					as: 'JobData'
				})
			}
		}],
		allow_update: false,
		allow_create: false
	}
};

module.exports={
	name: 'Jobs',
	models,
	dir: __dirname,
	gql: ({sqlWrapper}) => {
		console.log('building Job gql');
		const Job=sqlWrapper.getModel('Job');
		const typeDefs=gql`
		extend type Mutation {
			"""
			Set the status of a Job to 'queued'. This can only be called on Jobs that
			currently have status = 'waiting'.
			"""
			JobStart(id:ID!): Job
		}
		`;
		const resolvers = {
			Mutation: {
				pingJob: async (root,args) => {
					console.log('building ping job ',args);
					const result = await Job.create({type:'ping',label:args.text||'ping',status:'queued'});
					return result;
				},
				JobSetQueued: async (root,{id}) => {
					const job = await Job.findByPk(id);
					if(job.status != 'waiting') throw new Error('only waiting jobs may be moved to queued');
					job.status='queued';
					await job.save();
					return job;
				}
			}
		};
		return {typeDefs,resolvers};
	}
};
