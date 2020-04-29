const assert=require('assert');
const {buildFromEnv} = require('../../shared/module-wrapper');
const {SubscriptionManager,SUBSCRIBED,UNSUBSCRIBED} = require('./index');

describe('messages-test', function() {
	let EmailGlobalSubscriptionStatus, PersonEmail;
	let moduleWrapper,sqlWrapper;
	let manager;

	before('get moduleWrapper', async function() {
		moduleWrapper = await buildFromEnv();
		sqlWrapper = moduleWrapper.sqlWrapper;
		manager = new SubscriptionManager({sqlWrapper});
		EmailGlobalSubscriptionStatus=sqlWrapper.getModel('EmailGlobalSubscriptionStatus');
		PersonEmail=sqlWrapper.getModel('PersonEmail');
	});

	beforeEach('delete old data', async function() {
		await sqlWrapper.sequelize.truncate({force:true});
	});

	after('shutdown', async function() {
		await moduleWrapper.close();
	});

	describe('subscriptions', function() {
		it('should have correct constants', function() {
			assert.equal(SUBSCRIBED,0);
			assert.equal(UNSUBSCRIBED,1);
		})

		describe('SubscriptionManager', function() {
			it('should update the global subscription status for a PersonEmail when unsubscribeAll called', async function() {
				// given
				console.log('creating');
				await PersonEmail.create({id:12, person_id: 4, email: 'larry@zoolander.com'},{validate:false});
				console.log('created');

				// when
				await manager.unsubscribeAll({id:12});

				// then
				const g = await EmailGlobalSubscriptionStatus.findOne({where: {person_email_id:12, channel: 'EMAIL'}});
				assert.deepEqual({
					channel:g.channel,
					person_email_id:g.person_email_id,
					status: g.status
				}, {
					channel: 0,
					person_email_id: 12,
					status: UNSUBSCRIBED
				});
			});
		})
	});
});
