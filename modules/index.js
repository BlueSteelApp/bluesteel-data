// const ModuleWrapper=require('../shared');
module.exports=function(options) {
	const getPeople = require('./people');
	const getTransactions = require('./transactions');

	const people = getPeople(options);
	const transactions = getTransactions(options);

	return {
		installed: [people,transactions]
	};
};
