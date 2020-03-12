const getCore=require('../core');
const Import=require('./import');
module.exports=async function() {
	const core=await getCore();
	return new Import(core);
};
