/* jshint indent: 1 */
const sequelize=require('sequelize');
module.exports = function() {
	return {
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
		},
		associations: [{
			name: 'Person',
			build: (Segment,Person) => {
				Segment.belongsToMany(Person,{
					validate: false,
					as: 'Person',
					through: 'SegmentMembership',
					foreignKey: 'segment_id'
				});
				Person.belongsToMany(Segment,{
					validate:false,
					as: 'Segment',
					through: 'SegmentMembership',
					foreignKey: 'person_id'
				});
			}
		}]
	};
};
