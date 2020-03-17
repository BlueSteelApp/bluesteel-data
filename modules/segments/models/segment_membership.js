/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
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
	};
};
