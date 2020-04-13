const assert=require('assert');
const {buildFromEnv} = require('../../../shared/module-wrapper');
const EmailDeliveryEngineWrapper = require('./');

describe('email delivery engine wrapper', function() {
	let moduleWrapper,sqlWrapper;
	let EmailBlast, EmailDelivery;
	before('setup moduleWrapper', async function() {
		moduleWrapper = await buildFromEnv();
		sqlWrapper = moduleWrapper.sqlWrapper;
		EmailBlast = sqlWrapper.getModel('EmailBlast');
		EmailDelivery = sqlWrapper.getModel('EmailDelivery');

		await EmailBlast.destroy({truncate:true});
		await EmailDelivery.destroy({truncate:true});
	});

	describe('using dev engine', function() {
		it('should send the message to emails queued delivery records', async function() {
			this.timeout(20000);

			// given
			await EmailBlast.create({
				id: 1,
				message_set_id: 1,
				subject: 'test-subject',
				from_name: 'test-from-name',
				from_email: 'test-from@bluesteelcrm.com',
				html_body: 'This is an html Body Hi hello',
				text_body: 'test-text',
				status: 'LIST_BUILT'
			}, {validate:false});
			await EmailDelivery.bulkCreate([
				{email_blast_id:1, person_id:1, person_email: 'larry@zoolander.com', status: 0},
				{email_blast_id:1, person_id:2, person_email: 'derek@zoolander.com', status: 0},
			]);

			// when
			const wrapper = new EmailDeliveryEngineWrapper({
				engine_type: 'ethereal-test',
				email_blast_id: 1,
				sqlWrapper,
			});
			await wrapper.run();

			// then
			const deliveries = (await EmailDelivery.findAll({
				where: {email_blast_id: 1}
			})).map(({status,person_id,email_blast_id,person_email}) => ({status,person_id,email_blast_id,person_email}));
			assert.deepEqual([{
        "email_blast_id": 1,
        "person_email": "larry@zoolander.com",
        "person_id": 1,
        "status": 1
      },{
        "email_blast_id": 1,
        "person_email": "derek@zoolander.com",
        "person_id": 2,
        "status": 1
      }], deliveries);
		});
	});
});
