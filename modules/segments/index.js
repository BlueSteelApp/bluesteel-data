const sequelize=require('sequelize');

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
			build: (Segment,PersonQuery) => {
				Segment.belongsTo(PersonQuery,{
					validate: false,
					as: 'PersonQuery',
					through: 'person_query_id'
				});
				PersonQuery.hasMany(Segment,{
					validate:false,
					as: 'Segment',
				});
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
			}
		},
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
				})
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
				allowNull: false
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
			build: (SegmentPerson,Person) => {
				SegmentPerson.belongsTo(Person,{
					validate: false,
					as: 'Person',
					through: 'person_id'
				});
				Person.hasMany(SegmentPerson,{
					validate:false,
					as: 'SegmentPerson',
				});
			}
		},{
			name: 'Segment',
			build: (SegmentPerson,Segment) => {
				SegmentPerson.belongsTo(Segment,{
					validate: false,
					as: 'Segment',
					through: 'segment_id'
				});
				Segment.hasMany(SegmentPerson,{
					validate:false,
					as: 'SegmentPerson',
				});
			}
		}]
	}
};

module.exports={
	name: 'Segments',
	dir: __dirname,
	models,
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
