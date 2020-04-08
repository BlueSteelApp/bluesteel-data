const assert=require('assert');

const YasqlQueryRunner = require('./yasql-query');
const {buildSequelizeFromEnv} = require('./sql-wrapper');
const ModuleWrapper = require('./module-wrapper');

const envSequelize=buildSequelizeFromEnv();

describe('yasql-query-runner', function() {
	let moduleWrapper;
	before('setup wrapper', async function() {
		moduleWrapper = new ModuleWrapper({sequelize:envSequelize, all_modules:true});
		await moduleWrapper.initialize();
	});

	function testToSql(query, expected, target) {
		it('should convert '+JSON.stringify(query)+' to '+expected, async function() {
			target = target || 'Person';

			query.condition = query.condition || [];
			query.output = query.output || [];

			const sqlWrapper = moduleWrapper.sqlWrapper;
			const runner = new YasqlQueryRunner({sqlWrapper,query,target});
			const result = await runner.getSql();

			assert.equal(result, expected);
		});
	}

	describe('single table queries', function() {
		testToSql({
			output: [{
				name: 'total',
				output: 'count(*)',
			}],
			condition: [{
				output: 'family_name = "Zoolander"'
			}]
		}, "select count(*) as `total` from `person` `Person` where (`Person`.`family_name` = 'Zoolander')");
	});

	describe('multilevel conditions', function() {
		testToSql({
			output: [{
				name: 'total',
				output: 'count(*)',
			}],
			condition: [{
				and: [{
					output: 'family_name = "Zoolander"'
				}, {
					or: [{
						output: 'given_name="Derek"'
					},{
						output: 'given_name="Larry"'
					}]
				}]
			}]
		}, [
			"select count(*) as `total` from `person` `Person`",
			"where ((`Person`.`family_name` = 'Zoolander') and",
			"((`Person`.`given_name` = 'Derek') or (`Person`.`given_name` = 'Larry')))"
		].join(' '));
	});

	describe('automatic joining queries', function() {
		testToSql({
			output: [{
				name: 'total_transactions',
				target: 'Transaction',
				output: 'count(*)',
			}],
			condition: [{
				output: 'family_name = "Zoolander"'
			}]
		}, [
			"select (select count(*) from `transaction` `Transaction` where `Person`.id = `Transaction`.`person_id`)",
			"as `total_transactions` from `person` `Person` where (`Person`.`family_name` = 'Zoolander')"
		].join(' '));

		// people who have donated more than $10 in the past 6 months
		testToSql({
			output: [{
				name: 'total',
				output: 'count(*)',
			}],
			condition: [{
				having: 'amount > 10 and ts > date_sub(now(), interval 6 month)',
				target: 'Transaction'
			}]
		}, [
			"select count(*) as `total` from `person` `Person`",
			"where (exists (select * from `transaction`",
			"`Transaction` where `Person`.id = `Transaction`.`person_id` and",
			"((`Transaction`.`amount` > 10) and",
			"(`Transaction`.`ts` > date_sub(now(), interval 6 month)))))"
		].join(' '));

		testToSql({
			output: [{
				name: 'sum_transactions_last_year',
				target: 'Transaction',
				output: 'sum(amount)',
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
		}, [
			"select",
			"(select sum(`Transaction`.`amount`) from `transaction` `Transaction` where `Person`.id = `Transaction`.`person_id`",
			"and (`Transaction`.`ts` > date_sub(now(), interval 1 year))) as `sum_transactions_last_year`,",
			"(select count(*) from `transaction` `Transaction` where `Person`.id = `Transaction`.`person_id`",
			"and (`Transaction`.`ts` > date_sub(now(), interval 1 year))) as `total_transactions_last_year`",
			"from `person` `Person` where (`Person`.`family_name` = 'Zoolander')"
		].join(' '));
	});
});
