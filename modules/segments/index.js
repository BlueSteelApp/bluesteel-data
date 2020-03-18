const sequelize=require('sequelize');

const models = {
	segment: {
		name: 'Segment',
		tableName: 'segment',
		fields: {
			label: {
				type: sequelize.STRING(255),
				allowNull: false
			},
			description: {
				type: sequelize.TEXT(),
				allowNull: true
			}
		}
	},
	segment_person_membership: {
		name: 'SegmentMembership',
		tableName: 'segment_membership',
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
			build: (SegmentMembership,Person) => {
				SegmentMembership.belongsTo(Person,{
					validate: false,
					as: 'Person',
					through: 'person_id'
				});
				Person.hasMany(SegmentMembership,{
					validate:false,
					as: 'SegmentMembership',
				});
			}
		},{
			name: 'Segment',
			build: (SegmentMembership,Segment) => {
				SegmentMembership.belongsTo(Segment,{
					validate: false,
					as: 'Segment',
					through: 'segment_id'
				});
				Segment.hasMany(SegmentMembership,{
					validate:false,
					as: 'SegmentMembership',
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
