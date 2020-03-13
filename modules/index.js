module.exports=function(options) {
	const getPeople = require('./people');

	const people = getPeople(options);
	return {
		installed: [people]
	};
};
