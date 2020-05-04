const assert=require('assert');
const {buildFromEnv} = require('../../shared/module-wrapper');
const EmailDeliveryListBuilder = require('./list-builder');

describe('list-builder-test', function() {
	let moduleWrapper,sqlWrapper;
	let EmailBlast;
	let EmailDelivery;
	let PersonQuery;

	let Person;
	let PersonEmail;

	after('shutdown', async function() {
		await moduleWrapper.close();
	});

	before('setup moduleWrapper', async function() {
		moduleWrapper = await buildFromEnv();
		sqlWrapper = moduleWrapper.sqlWrapper;

		EmailBlast = sqlWrapper.getModel('EmailBlast');
		PersonQuery = sqlWrapper.getModel('PersonQuery');

		EmailDelivery = sqlWrapper.getModel('EmailDelivery');
		Person = sqlWrapper.getModel('Person');
		PersonEmail = sqlWrapper.getModel('PersonEmail');

		await EmailBlast.destroy({truncate:true});
		await PersonQuery.destroy({truncate:true});
		await Person.destroy({truncate:true});
		await PersonEmail.destroy({truncate:true});
		await EmailDelivery.destroy({truncate:true});

		await Person.bulkCreate([
			{id:1, given_name: 'Derek', family_name: 'Zoolander'},
			{id:2, given_name: 'Larry', family_name: 'Zoolander'},
			{id:3, given_name: 'Luke', family_name: 'Zoolander'},
			{id:4, given_name: 'Hansel', family_name: 'McDonald'}
		]);
		await PersonEmail.bulkCreate([
			{person_id:1, email: 'derek@zoolander.com'},
			{person_id:2, email: 'larry@zoolander.com'},
			{person_id:3, email: 'luke@zoolander.com'},
			{person_id:4, email: 'hansel@zoolander.com'},
		]);
	});

	async function runBuildDelivery(email_blast_id, def) {
		const query = await PersonQuery.create({
			query: def,
			label: 'Test Query'
		});
		await EmailBlast.create({
			id:email_blast_id,
			query_id: query.id,
			message_set_id: 1,
			subject: 'test-subject',
			from_name: 'test-from-name',
			from_email: 'test-from-email@test.com',
			html_body: 'test-html',
			text_body: 'test-text',
			source_code:'TEST_ABC_123',
			status: 'READY_TO_BUILD'
		}, {validate:false});

		const builder = new EmailDeliveryListBuilder({sqlWrapper, email_blast_id});
		await builder.run();
	}

	describe('building an email blast delivery list', function() {
		it('should match the people from the query', async function() {
			await runBuildDelivery(1, {conditions: [{
				expression: 'family_name="Zoolander"'
			}]});

			const deliveries = (await EmailDelivery.findAll({
				where: {email_blast_id: 1}
			})).map(({status,person_id,email_blast_id,person_email}) => ({status,person_id,email_blast_id,person_email}));

			assert.deepEqual(deliveries,[{
				"email_blast_id": 1,
				"person_email": "derek@zoolander.com",
				"person_id": 1,
				status: 0
			},{
				"email_blast_id": 1,
				"person_email": "larry@zoolander.com",
				"person_id": 2,
				status: 0
			},{
				"email_blast_id": 1,
				"person_email": "luke@zoolander.com",
				"person_id": 3,
				status: 0
			}]);
		});
	});
	describe('Delivering emails via the delivery engine', async function() {
		this.timeout(10000);
		it('should delivery correctly formatted emails', async function() {
			const EmailDeliveryEngineWrapper=require('./engine');
			const engine = new EmailDeliveryEngineWrapper({
				sqlWrapper,
				email_blast_id:1,
				engine_type: process.env.BLUESTEEL_DELIVERY_ENGINE_TYPE
			});
			await engine.run();
		});
	})
});
