const sequelize=require('sequelize');
const {gql}=require('apollo-server-express');

const models = {
	segment: {
		name: 'Segment',
		tableName: 'segment',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: false,
				unique:true
			},
			description: {
				type: sequelize.TEXT(),
				allowNull: true
			},
			person_query_id: {
				type: sequelize.INTEGER(11),
				allowNull: true
			}
		},
		associations: [{
			name: 'PersonQuery',
			options: {
				type: 'ManyToOne',
				source_field: 'person_query_id'
			}
		}]
	},
	segment_build: {
		name: 'SegmentBuild',
		tableName: 'segment_build',
		fields: {
			segment_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			query: {
				type: sequelize.JSON,
				allowNull: false
			},
		},
		allow_create: false,
		allow_update: false,
		associations: [{
			name: 'Segment',
			build: (SegmentBuild,Segment) => {
				SegmentBuild.belongsTo(Segment, {
					validate: false,
					as: 'Segment',
					through: 'segment_id'
				});
				Segment.hasMany(SegmentBuild,{
					validate: false,
					as: 'SegmentBuild'
				});
			}
		}, {
			name: 'Job',
			gql_one_way: true,
			build: (SegmentBuild,Job) => {
				Job.addScope('segment_build', {
					where: {
						type: 'segment_build'
					}
				});
				SegmentBuild.hasOne(Job.scope('segment_build'), {
					validate: false,
					as: 'Job',
					foreignKey: 'job_definition_id'
				});
			}
		}]
	},
	segment_person: {
		name: 'SegmentPerson',
		tableName: 'segment_person',
		fields: {
			segment_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			person_id: {
				type: sequelize.INTEGER(11),
				allowNull: false
			},
			status: {
				type: sequelize.INTEGER(2),
				allowNull: false,
				defaultValue: 1
			},
			added_at: {
				type: sequelize.DATE(),
				allowNull: true
			},
			removed_at: {
				type: sequelize.DATE(),
				allowNull: true
			}
		},
		paranoid: true,
		associations: [{
			name: 'Person',
			options: {
				type: 'ManyToOne',
				source_field: 'person_id'
			}
		},{
			name: 'Segment',
			options: {
				type: 'ManyToOne',
				source_field: 'segment_id'
			},
		}]
	}
};

module.exports={
	name: 'Segments',
	dir: __dirname,
	models,
	gql: ({serviceLayer}) => {
		const typeDefs=gql`
		extend type Mutation {
			"""
			Creates the following objects:
			- SegmentBuild: Holding the SegmentID and the information of this discrete build
			- Job: The job object managing this SegmentBuild, pointing to the SegmentBuild

			By default, create_paused = true. Set to false to create this job and immediately
			set it to "queued".

			To get the Job created for this, access the Job edge on SegmentBuild
			"""
			SegmentBuildJobCreate(segment_id:ID!, create_paused: Boolean): SegmentBuild
		}`;
		const resolvers = {
			Mutation: {
				SegmentBuildJobCreate: async (root,{segment_id,create_paused=true},context) => {
					const Segment = serviceLayer.getService('Segment',context);
					const SegmentBuild = serviceLayer.getService('SegmentBuild',context);
					const Job = serviceLayer.getService('Job',context);

					const segment = await Segment.findByPk(segment_id);
					if(!segment) throw new Error('segment does not exist, or you do not have permission to view it');

					const query = await segment.getPersonQuery();
					if(!query) throw new Error('segment is not based on a person_query, so it cannot be built');

					const build = await SegmentBuild.save({segment_id,query: query.query});
					const status = create_paused ? 'waiting' : 'queued';
					await Job.save({
						label: 'Build Segment: '+(segment.label||segment_id),
						job_definition_id: build.id,
						type: 'segment_build',
						status
					});

					return build;
				}
			}
		};
		return {resolvers,typeDefs};
	},
	jobs: [{
		type: 'segment_build',
		run: (job, {sqlWrapper}) => {
			const segment_build_id = job.job_definition_id;
			const SegmentPersonBuilder=require('./build');
			const builder = new SegmentPersonBuilder({
				sqlWrapper,
				segment_build_id
			});
			return builder.run();
		}
	}]
};
