const assert=require('assert');

const YasqlQueryRunner = require('./yasql-query');
const {buildSequelizeFromEnv} = require('./sql-wrapper');
const ModuleWrapper = require('./module-wrapper');

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
		it('should ', async function () {
			const result = await (new YasqlQueryRunner({
				sqlWrapper: moduleWrapper.sqlWrapper,
				target: target || 'Person',
				query
			})).run();

			assert.deepEqual(expectedRows, result);
		});
	}

	describe('single table queries', function() {
		testRun({
			output: [{
				name: 'total',
				output: 'count(*)',
			}],
			condition: [{
				output: 'family_name = "Zoolander"'
			}]
		}, [{total: 3}]);
	});

	describe('multilevel conditions', function() {
		testRun({
			output: [{
				name: 'total',
				output: 'count(*)',
			}],
			condition: [{
				$and: [{
					output: 'family_name = "Zoolander"'
				}, {
					$or: [{
						output: 'given_name="Derek"'
					},{
						output: 'given_name="Larry"'
					}]
				}]
			}]
		}, [{total: 2}]);
	});

	describe('automatic joining queries', function() {
		testRun({
			output: [{
				name: 'person_id',
				output: 'id'
			},{
				name: 'total_transactions',
				target: 'Transaction',
				output: 'count(*)',
			}],
			condition: [{
				output: 'family_name = "Zoolander"'
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
			output: [{
				name: 'total_donating_more_than_10',
				output: 'count(*)',
			}],
			condition: [{
				having: 'amount > 10 and ts > date_sub(now(), interval 6 month)',
				target: 'Transaction'
			}]
		}, [{
			total_donating_more_than_10: 1
		}]);

		testRun({
			output: [{
				name: 'person_id',
				output: 'id'
			},{
				name: 'sum_transactions_last_year',
				target: 'Transaction',
				output: 'ifnull(sum(amount),0)',
				having: 'ts > date_sub(now(), interval 1 year)'
			},{
				name: 'total_transactions_last_year',
				target: 'Transaction',
				output: 'count(*)',
				having: 'ts > date_sub(now(), interval 1 year)'
			}],
			condition: [{
				output: 'family_name = "Zoolander"'
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
