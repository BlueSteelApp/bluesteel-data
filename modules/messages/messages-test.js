const assert=require('assert');
const {buildFromEnv} = require('../../shared/module-wrapper');

describe('messages-test', function() {
	let Campaign,MessageSet;
	let moduleWrapper,sqlWrapper;

	before('get moduleWrapper', async function() {
		moduleWrapper = await buildFromEnv();
		sqlWrapper = moduleWrapper.sqlWrapper;
		Campaign=sqlWrapper.getModel('Campaign');
		MessageSet=sqlWrapper.getModel('MessageSet');
	});

	beforeEach('delete old data', async function() {
		await Campaign.destroy({truncate:true});
		await MessageSet.destroy({truncate:true});
	});

	after('shutdown', async function() {
		await moduleWrapper.close();
	});

	describe('MessageSet', function() {
		describe('creation', function() {
			it('should succeed if the campaign does exist', async function() {
				// given
				await Campaign.create({id:1, label:'Zoolander Marketing'});
				// then should work
				await MessageSet.create({campaign_id: 1});
			});

			it('should fail if the campaign does not exist', async function() {
				await assert.rejects(async () => {
					await MessageSet.create({
						campaign_id: -1
					});
				}, {
					message: "Validation error: campaign does not exist"
				});
			});
		})
	});
});
