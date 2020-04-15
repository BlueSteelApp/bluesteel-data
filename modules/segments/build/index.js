const DataTypes=require('sequelize');

function SegmentPersonBuilder(options) {
	const {sqlWrapper,segment_id} = options;
	if(!sqlWrapper) throw new Error('sqlWrapper is required');
	if(!segment_id) throw new Error('segment_id is required');
	this.segment_id=segment_id;
	this.sqlWrapper=sqlWrapper;

	this.Segment=sqlWrapper.getModel('Segment');
	this.SegmentPerson=sqlWrapper.getModel('SegmentPerson');
	this.Person=sqlWrapper.getModel('Person');

	this.tempModelFields = {
		person_id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true
		}
	};
}

SegmentPersonBuilder.prototype.getTempModel = function() {
	if(this.tempModel) return this.tempModel;

	const {sqlWrapper,SegmentPerson} = this;
	const tableName = this.tableName = `segment_person_${this.segment_id}_`+(new Date().getTime());
	const fields = this.tempModelFields;

	const tempModel = this.tempModel = sqlWrapper.sequelize.define(tableName,fields,{
		tableName,
		timestamps:false
	});

	tempModel.hasMany(SegmentPerson, {
		foreignKey: 'person_id',
		sourceKey: 'person_id',
		validate:false,
		as: 'ExistingSegmentPerson'
	});
	SegmentPerson.belongsTo(tempModel, {
		foreignKey: 'person_id',
		targetKey: 'person_id',
		validate: false,
		as: tableName
	})

	return this.tempModel;
};

SegmentPersonBuilder.prototype.run=async function() {
	const {segment_id,sqlWrapper,sqlWrapper:{sequelize}}=this;
	const {Segment,SegmentPerson}=this;

	const segment = await Segment.findByPk(segment_id);
	if(!segment) throw new Error('invalid segment_id: '+segment_id);

	const personQuery = await segment.getPersonQuery();
	if(!personQuery) throw new Error('no person_query for this segment - aborting build');

	const {query:{conditions}} = personQuery;
	if(!conditions) throw new Error('no conditions defined for PersonQuery - aborting');

	const query = {conditions,  outputs: [{
		name: 'person_id',
		expression: 'id',
	}]};

	const tempModel = this.getTempModel();
	await sequelize.queryInterface.createTable(tempModel.tableName, this.tempModelFields);

	const runner = sqlWrapper.getQueryRunner({query,target:'Person'});
	await runner.loadToTable({table:tempModel.tableName});

	const added_at = new Date(), removed_at=added_at;
	await sqlWrapper.processPagedQuery(tempModel, {
		include: [{
			model: SegmentPerson,
			as: 'ExistingSegmentPerson',
			where: {
				segment_id,
			},
			required: false,
		}],
	}, async page => {
		// add the records _without_ an existing segment person
		const values = page.filter(x=>!(x.ExistingSegmentPerson||[]).length).map(x => ({
			person_id: x.person_id,
			added_at,
			segment_id,
			status: 1
		}));
		if(!values.length) {
			console.log('no new values to set', values);
			return;
		}
		console.log('adding',values.length,'records');
		await SegmentPerson.bulkCreate(values,{
			fields: Object.keys(values[0]),
			validate:false
		});
	});

	// update the records that are no longer present in the segment
	await sqlWrapper.processPagedQuery(SegmentPerson, {
		include: [{
			model: tempModel,
			required: false,
			as: this.tableName
		}],
		where: {
			segment_id,
			status: 1
		},
	}, async page => {
		const values = page.filter(x=>!x[this.tableName])
			.map(x => ({
				id:x.id,
				status:0,
				person_id:x.person_id,
				segment_id,
				removed_at
			}));
		if(!values.length) {
			console.log('no values to remove');
			return;
		}
		try {
			await SegmentPerson.bulkCreate(values, {
				updateOnDuplicate: Object.keys(values[0])
			});
		} catch(e) {
			console.error(e);
			throw e;
		}
	});
}

module.exports=SegmentPersonBuilder;
