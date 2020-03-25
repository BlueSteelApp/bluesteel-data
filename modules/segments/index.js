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
			}
		}
	},
	segment_person_membership: {
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
			}
		},
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
};
