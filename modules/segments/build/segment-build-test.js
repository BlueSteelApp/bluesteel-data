const assert=require('assert');
const {buildFromEnv} = require('../../../shared/module-wrapper');
const SegmentPersonBuilder = require('./');

const beforeStart = new Date() - 10000; // sql/sequelize has second precision

describe('segment-builder-test', function() {
	let moduleWrapper,sqlWrapper;
	let PersonQuery;
	let Segment;
	let SegmentPerson;
	let Person;

	after('shutdown', async function() {
		await moduleWrapper.close();
	});

	before('setup moduleWrapper', async function() {
		moduleWrapper = await buildFromEnv();
		sqlWrapper = moduleWrapper.sqlWrapper;

		PersonQuery = sqlWrapper.getModel('PersonQuery');
		Person = sqlWrapper.getModel('Person');
		SegmentPerson = sqlWrapper.getModel('SegmentPerson');
		Segment = sqlWrapper.getModel('Segment');

		await PersonQuery.destroy({truncate:true});
		await Person.destroy({truncate:true});
		await SegmentPerson.destroy({truncate:true});
		await Segment.destroy({truncate:true});

		await Person.bulkCreate([
			{id:1, given_name: 'Derek', family_name: 'Zoolander'},
			{id:2, given_name: 'Larry', family_name: 'Zoolander'},
			{id:3, given_name: 'Luke', family_name: 'Zoolander'},
			{id:4, given_name: 'Hansel', family_name: 'McDonald'},
			{id:5, given_name: 'Matilda', family_name: 'Jeffries'}
		]);
	});

	async function createSegment(def) {
		const query = await PersonQuery.create({
			query: def,
			label: 'Test Query'
		});
		const {id:segment_id} = await Segment.create({
			label: 'segment_'+query.id,
			person_query_id: query.id,
		}, {validate:false});

		return segment_id;
	}

	describe('updating an existing segment', function() {
		let segment_id, segmentPersons;
		const initial = new Date(parseInt(new Date().getTime()/1000)*1000);
		before('create pre-eexisting and then build the segment', async function() {
			// given
			segment_id = await createSegment({conditions: [{
				expression: 'family_name="Zoolander"'
			}]});

			console.log('populating');
			await SegmentPerson.bulkCreate([1,2,3,4,5].map(person_id => ({
				person_id,
				segment_id,
				status:1,
				added_at: initial
			})), {validate:false});

			// when
			console.log('building');
			const builder = new SegmentPersonBuilder({sqlWrapper, segment_id});
			await builder.run();

			segmentPersons = (await SegmentPerson.findAll({
				where: {segment_id}
			}));
		});

		it('should have the same added_at for all of them', function() {
			assert.deepEqual(segmentPersons.map(x=>x.added_at), [initial,initial,initial,initial,initial]);
		});

		it('should have a null removed_at', function() {
			const {removed_at}=segmentPersons[4];
			assert.deepEqual(segmentPersons.map(x=>x.removed_at),[null,null,null,removed_at,removed_at]);
		});

		it('should have status=1', function() {
			assert.deepEqual(segmentPersons.map(x=>x.status), [1,1,1,0,0]);
		});

		it('should match the people from the query', function() {
			assert.deepEqual(segmentPersons.map(x=>x.person_id),[1,2,3,4,5]);
		});
	});

	describe('building for a new segment', function() {
		describe('when adding people based on query', function() {
			let segment_id, segmentPersons;
			before('create and build the segment', async function() {
				// given
				segment_id = await createSegment({conditions: [{
					expression: 'family_name="Zoolander"'
				}]});

				// when
				const builder = new SegmentPersonBuilder({sqlWrapper, segment_id});
				await builder.run();

				segmentPersons = (await SegmentPerson.findAll({
					where: {segment_id}
				}));
			});

			// then
			it('should have the same added_at for all of them', function() {
				const first = segmentPersons[0].added_at;
				if(beforeStart > first) throw new Error(first.getTime()+' < '+beforeStart);
				assert.deepEqual(segmentPersons.map(x=>x.added_at), [first,first,first]);
			});

			it('should have a null removed_at', function() {
				assert.deepEqual(segmentPersons.map(x=>x.removed_at),[null,null,null]);
			});

			it('should have status=1', function() {
				assert.deepEqual(segmentPersons.map(x=>x.status), [1,1,1]);
			});

			it('should match the people from the query', function() {
				assert.deepEqual(segmentPersons.map(x=>x.person_id),[1,2,3]);
			});
		});
	});
});
