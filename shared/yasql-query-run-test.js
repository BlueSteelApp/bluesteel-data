const assert=require('assert');

const YasqlQueryRunner = require('./yasql-query');
const {buildSequelizeFromEnv} = require('./sql-wrapper');
const ModuleWrapper = require('./module-wrapper');
const es = require('event-stream');

require('dotenv').config();

const envSequelize=buildSequelizeFromEnv();

describe('yasql-query-runner', function() {
	let moduleWrapper;
	before('setup wrapper', async function() {
		moduleWrapper = new ModuleWrapper({sequelize:envSequelize, all_modules:true});
		await moduleWrapper.initialize();
	});

	before('buildPersonData', async function() {
		const Person = moduleWrapper.sqlWrapper.getModel('Person');
		await Person.destroy({truncate:true});
		await Person.bulkCreate([
			{id:1, given_name: 'Derek', family_name: 'Zoolander'},
			{id:2, given_name: 'Larry', family_name: 'Zoolander'},
			{id:3, given_name: 'Luke', family_name: 'Zoolander'},
			{id:4, given_name: 'Hansel', family_name: 'McDonald'}
		]);

		const Transaction = moduleWrapper.sqlWrapper.getModel('Transaction');
		await Transaction.destroy({truncate:true});
		await Transaction.bulkCreate([
			{id: 1, person_id: 1, amount:11, ts: new Date()},
			{id: 2, person_id: 2, amount:10, ts: new Date('2016-01-01')},
			{id: 3, person_id: 4, amount:10, ts: new Date()},
			{id: 4, person_id: 1, amount:12, ts: new Date()},
		]);
	});
	after('shut down db', async function() {
		await moduleWrapper.close();
	});

	async function testRun(query, expectedRows, target) {
		it('should work with Run', async function () {
			const result = await (new YasqlQueryRunner({
				sqlWrapper: moduleWrapper.sqlWrapper,
				target: target || 'Person',
				query
			})).run();

			assert.deepEqual(expectedRows, result);
		});
		it('should work with streaming', function(done) {
			new YasqlQueryRunner({
				sqlWrapper: moduleWrapper.sqlWrapper,
				target: target || 'Person',
				query
			}).getStream({pageSize:2}).then(stream =>
				stream.pipe(es.writeArray((e,result) => {
					if(e) return done(e);
					assert.deepEqual(expectedRows, result);
					done();
				})));
		});
	}

	describe('single table queries', function() {
		testRun({
			outputs: [{
				name: 'total',
				expression: 'count(*)',
			}],
			conditions: [{
				expression: 'family_name = "Zoolander"'
			}]
		}, [{total: 3}]);
	});

	describe('multilevel conditions', function() {
		testRun({
			outputs: [{
				name: 'total',
				expression: 'count(*)',
			}],
			conditions: [{
				and: [{
					expression: 'family_name = "Zoolander"'
				}, {
					or: [{
						expression: 'given_name="Derek"'
					},{
						expression: 'given_name="Larry"'
					}]
				}]
			}]
		}, [{total: 2}]);
	});

	describe('automatic joining queries', function() {
		testRun({
			outputs: [{
				name: 'person_id',
				expression: 'id'
			},{
				name: 'total_transactions',
				target: 'Transaction',
				expression: 'count(*)',
			}],
			conditions: [{
				expression: 'family_name = "Zoolander"'
			}]
		}, [{
			person_id: 1,
			total_transactions: 2
		},{
			person_id: 2,
			total_transactions: 1
		},{
			person_id: 3,
			total_transactions: 0
		}]);

		// people who have donated more than $10 in the past 6 months
		testRun({
			outputs: [{
				name: 'total_donating_more_than_10',
				expression: 'count(*)',
			}],
			conditions: [{
				having: 'amount > 10 and ts > date_sub(now(), interval 6 month)',
				target: 'Transaction'
			}]
		}, [{
			total_donating_more_than_10: 1
		}]);

		testRun({
			outputs: [{
				name: 'person_id',
				expression: 'id'
			},{
				name: 'sum_transactions_last_year',
				target: 'Transaction',
				expression: 'ifnull(sum(amount),0)',
				having: 'ts > date_sub(now(), interval 1 year)'
			},{
				name: 'total_transactions_last_year',
				target: 'Transaction',
				expression: 'count(*)',
				having: 'ts > date_sub(now(), interval 1 year)'
			}],
			conditions: [{
				expression: 'family_name = "Zoolander"'
			}]
		}, [{
			person_id: 1,
			sum_transactions_last_year: 23,
			total_transactions_last_year: 2
		},{
			person_id: 2,
			sum_transactions_last_year: 0,
			total_transactions_last_year: 0
		},{
			person_id: 3,
			sum_transactions_last_year: 0,
			total_transactions_last_year: 0
		}]);
	});
});
