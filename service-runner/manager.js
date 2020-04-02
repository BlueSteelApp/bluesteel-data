const path = require('path');
const RUNNER_DIR = path.join(__dirname,'./runner.js');

const {Worker}=require('worker_threads');

function Manager(options) {
	this.running = [];
	this.options=options||{};

	const {services}=this.options;
	if(!Array.isArray(services)) throw new Error('Expected array for options.services');
	this.services=services;
}

Manager.prototype.start=function() {
	if(this.running.length) throw new Error('start has already been called');
	this.services.forEach(x => this.startService(x));
};

Manager.prototype.startService=function(options) {
	let{service:{name,type}, config,config_path}=options;
	if(!type) throw new Error('no service.type found in options');
	if(!name) throw new Error('no service.name found in options');
	if(config_path && !config) {
		if(config_path.slice('-5')!='.json') throw new Error('config_path must be a JSON file');
		config = require(config_path);
	}
	if(!config) throw new Error('no config found in options');
	const worker = new Worker(RUNNER_DIR, {
		workerData: {config,service:{name,type}}
	});
	this.running.push({
		service: {name,type},
		worker
	});
};

module.exports=Manager;
