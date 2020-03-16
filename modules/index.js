// const ModuleWrapper=require('../shared');
module.exports=function(options) {
	const getPeople = require('./people');
	const getSegments = require('./segments');
	const getTransactions = require('./transactions');

	const people = getPeople(options);
	console.log('people',options.sequelize.model('Person'));
	const segments = getSegments(options);
	const transactions = getTransactions(options);

	return {
		installed: [
			people,
			segments,
			(require('./person-query'))(options),
			transactions
		]
	};
};
