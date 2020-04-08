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
			outputs: [{
				name: 'total',
				expression: 'count(*)',
			}],
			conditions: [{
				expression: 'family_name = "Zoolander"'
			}]
		}, "select count(*) as `total` from `person` `Person` where (`Person`.`family_name` = 'Zoolander')");
	});

	describe('multilevel conditions', function() {
		testToSql({
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
		}, [
			"select count(*) as `total` from `person` `Person`",
			"where ((`Person`.`family_name` = 'Zoolander') and",
			"((`Person`.`given_name` = 'Derek') or (`Person`.`given_name` = 'Larry')))"
		].join(' '));
	});

	describe('automatic joining queries', function() {
		testToSql({
			outputs: [{
				name: 'total_transactions',
				target: 'Transaction',
				expression: 'count(*)',
			}],
			conditions: [{
				expression: 'family_name = "Zoolander"'
			}]
		}, [
			"select (select count(*) from `transaction` `Transaction` where `Person`.id = `Transaction`.`person_id`)",
			"as `total_transactions` from `person` `Person` where (`Person`.`family_name` = 'Zoolander')"
		].join(' '));

		// people who have donated more than $10 in the past 6 months
		testToSql({
			outputs: [{
				name: 'total',
				expression: 'count(*)',
			}],
			conditions: [{
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
			outputs: [{
				name: 'sum_transactions_last_year',
				target: 'Transaction',
				expression: 'sum(amount)',
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
