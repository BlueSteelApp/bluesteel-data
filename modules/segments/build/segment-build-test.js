const assert=require('assert');
const {buildFromEnv} = require('../../../shared/module-wrapper');
const SegmentPersonBuilder = require('./');

const beforeStart = new Date() - 10000; // sql/sequelize has second precision

describe('segment-builder-test', function() {
	let moduleWrapper,sqlWrapper;
	let SegmentBuild;
	let SegmentPerson;
	let Person;

	after('shutdown', async function() {
		await moduleWrapper.close();
	});

	before('setup moduleWrapper', async function() {
		moduleWrapper = await buildFromEnv();
		sqlWrapper = moduleWrapper.sqlWrapper;

		Person = sqlWrapper.getModel('Person');
		SegmentPerson = sqlWrapper.getModel('SegmentPerson');
		SegmentBuild = sqlWrapper.getModel('SegmentBuild');

		await Person.destroy({truncate:true});

		await Person.bulkCreate([
			{id:1, given_name: 'Derek', family_name: 'Zoolander'},
			{id:2, given_name: 'Larry', family_name: 'Zoolander'},
			{id:3, given_name: 'Luke', family_name: 'Zoolander'},
			{id:4, given_name: 'Hansel', family_name: 'McDonald'},
			{id:5, given_name: 'Matilda', family_name: 'Jeffries'}
		]);
	});

	async function createSegmentBuild(def) {
		const segment_id = 1;
		const segmentBuild = await SegmentBuild.create({
			query: def,
			segment_id
		},{validate:false});

		return [segmentBuild.id,segment_id];
	}

	describe('updating an existing segment', function() {
		let segment_build_id, segment_id, segmentPersons,paranoid;
		const initial = new Date(parseInt(new Date().getTime()/1000)*1000);
		before('create pre-eexisting and then build the segment', async function() {
			// given
			await SegmentPerson.destroy({truncate:true,force:true});
			await SegmentBuild.destroy({truncate:true});

			[segment_build_id,segment_id] = await createSegmentBuild({conditions: [{
				expression: 'family_name="Zoolander"'
			}]});

			await SegmentPerson.bulkCreate([1,2,3,4,5].map(person_id => ({
				person_id,
				segment_id,
				status:1,
				added_at: initial
			})), {validate:false});

			// when
			const builder = new SegmentPersonBuilder({sqlWrapper, segment_build_id});
			await builder.run();

			segmentPersons = (await SegmentPerson.findAll({
				where: {segment_id}
			}));
			paranoid = (await SegmentPerson.findAll({
				where: {segment_id},
				paranoid: false
			}))
		});

		// check only the results
		it('should have the same added_at for all of them (paranoid)', function() {
			const first = segmentPersons[0].added_at;
			if(beforeStart > first) throw new Error(first.getTime()+' < '+beforeStart);
			assert.deepEqual(segmentPersons.map(x=>x.added_at), [first,first,first]);
		});

		it('should have a null removed_at (paranoid)', function() {
			assert.deepEqual(segmentPersons.map(x=>x.removed_at),[null,null,null]);
		});

		it('should have status=1 (paranoid)', function() {
			assert.deepEqual(segmentPersons.map(x=>x.status), [1,1,1]);
		});

		it('should match the people from the query (paranoid)', function() {
			assert.deepEqual(segmentPersons.map(x=>x.person_id),[1,2,3]);
		});

		// test the full list (including those marked "deleted")
		it('should have the same added_at for all of them [paranoid]', function() {
			assert.deepEqual(paranoid.map(x=>x.added_at), [initial,initial,initial,initial,initial]);
		});

		it('should have a null removed_at [paranoid]', function() {
			const {removed_at}=paranoid[4];
			assert.deepEqual(paranoid.map(x=>x.removed_at),[null,null,null,removed_at,removed_at]);
		});

		it('should have status=1 [paranoid]', function() {
			assert.deepEqual(paranoid.map(x=>x.status), [1,1,1,0,0]);
		});

		it('should match the people from the query [paranoid]', function() {
			assert.deepEqual(paranoid.map(x=>x.person_id),[1,2,3,4,5]);
		});
	});

	describe('building for a new segment', function() {
		describe('when adding people based on query', function() {
			let segment_id, segment_build_id, segmentPersons;
			before('create and build the segment', async function() {
				// given
				await SegmentPerson.destroy({truncate:true,force:true});
				await SegmentBuild.destroy({truncate:true});
				[segment_build_id,segment_id] = await createSegmentBuild({conditions: [{
					expression: 'family_name="Zoolander"'
				}]});

				// when
				const builder = new SegmentPersonBuilder({sqlWrapper, segment_build_id});
				await builder.run();

				segmentPersons = (await SegmentPerson.findAll({
					where: {segment_id}
				}));
			});

			// then
			it('should have the same added_at for all of them (paranoid)', function() {
				const first = segmentPersons[0].added_at;
				if(beforeStart > first) throw new Error(first.getTime()+' < '+beforeStart);
				assert.deepEqual(segmentPersons.map(x=>x.added_at), [first,first,first]);
			});

			it('should have a null removed_at (paranoid)', function() {
				assert.deepEqual(segmentPersons.map(x=>x.removed_at),[null,null,null]);
			});

			it('should have status=1 (paranoid)', function() {
				assert.deepEqual(segmentPersons.map(x=>x.status), [1,1,1]);
			});

			it('should match the people from the query (paranoid)', function() {
				assert.deepEqual(segmentPersons.map(x=>x.person_id),[1,2,3]);
			});
		});
	});
});
