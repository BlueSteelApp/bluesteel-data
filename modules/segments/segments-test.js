const assert=require('assert');
const {buildFromEnv} = require('../../shared/module-wrapper');

const segmentsModule = require('./');

describe('segments-test', function() {
	let Segment,SegmentBuild,SegmentPerson;
	let Job, PersonQuery;
	let moduleWrapper,sqlWrapper;

	before('get moduleWrapper', async function() {
		moduleWrapper = await buildFromEnv();
		sqlWrapper = moduleWrapper.sqlWrapper;
		Segment=sqlWrapper.getModel('Segment');
		SegmentBuild=sqlWrapper.getModel('SegmentBuild');
		SegmentPerson=sqlWrapper.getModel('SegmentPerson');
		Job=sqlWrapper.getModel('Job');
		PersonQuery=sqlWrapper.getModel('PersonQuery');
	});

	beforeEach('instantiate models', async function() {
		await Segment.destroy({truncate:true});
		await SegmentBuild.destroy({truncate:true});
		await SegmentPerson.destroy({truncate:true});
		await Job.destroy({truncate:true});
		await PersonQuery.destroy({truncate:true});
	});

	after('shutdown', async function() {
		await moduleWrapper.close();
	});

	describe('gql resolvers - Mutation.SegmentBuildJobCreate', function() {
		beforeEach('build sample data', async function() {
			await PersonQuery.bulkCreate([
				{id:1, query: 'person-query-def-1'}
			], {validate:false});
			await Segment.bulkCreate([
				{id:1,person_query_id:1,label:"My New Segment!"},
				{id:2,label: 'Not Query Based'}
			]);
		});

		it('should create the segmentBuild and job (status=queued) based on the query', async function() {
			const {resolvers} = segmentsModule.gql();

			// when
			const segmentBuild = await resolvers.Mutation.SegmentBuildJobCreate(null,{
				segment_id:1, create_paused:false
			}, await sqlWrapper.getContextAwareWrapper({user:{id:1}}));

			// then
			const {id,segment_id,query}=segmentBuild;
			assert.deepEqual({segment_id:1, query: 'person-query-def-1'}, {segment_id,query});
			const {status,job_definition_id,type,label} = await segmentBuild.getJob();
			assert.deepEqual(
				{type,status,job_definition_id,label},
				{
					type: 'segment_build',
					status: 'queued',
					job_definition_id: id,
					label: "Build Segment: My New Segment!"
				}
			);
		});

		it('should create the segmentBuild and job (status=waiting) based on query', async function() {
			const {resolvers} = segmentsModule.gql();

			// when
			const segmentBuild = await resolvers.Mutation.SegmentBuildJobCreate(null,{
				segment_id:1
			}, await sqlWrapper.getContextAwareWrapper({user:{id:1}}));

			// then
			const {id,segment_id,query}=segmentBuild;
			assert.deepEqual({segment_id:1, query: 'person-query-def-1'}, {segment_id,query});
			const {status,job_definition_id,type,label} = await segmentBuild.getJob();
			assert.deepEqual(
				{type,status,job_definition_id,label},
				{
					type: 'segment_build',
					status:'waiting',
					job_definition_id: id,
					label: "Build Segment: My New Segment!"
				}
			);
		});
	});

	describe('model associations', function() {
		beforeEach('build sample', async function() {
			await SegmentBuild.bulkCreate([
				{id:1, segment_id: 1, query:'test'},
				{id:2, segment_id: 2, query:'test'}
			], {validate:false});
			await Job.bulkCreate([
				{id:1, job_definition_id: 1, type: 'segment_build', status:'waiting', label:'job1'},
				{id:2, job_definition_id: 1, type: 'other', status: 'waiting', label:'job2'}
			]);
		});
		describe('segment-build associations', function() {
			// makes sure that the scope is applied, ignoring the other job with the same
			// job definition id
			it('should get associated job', async function() {
				const build = await SegmentBuild.findByPk(1);
				const job = await build.getJob();
				assert.equal(job.id,1);
			});
		});
	});
});
