const async=require('async');
const { v4: uuid } = require('uuid');

const {BLUESTEEL_SIGNUP_PROCESS_PAYLOAD_LIMIT}=process.env;

function SignupIntake(options) {
	const {sqlWrapper}=options;
	if(!sqlWrapper) throw new Error('sqlWrapper is a required option');

	const model = sqlWrapper.getModel('SignupRaw');
	this.model = model;
	this.payloadLimit = options.payloadLimit || BLUESTEEL_SIGNUP_PROCESS_PAYLOAD_LIMIT || 1000;
}

SignupIntake.prototype.initialize=async function() {
	const{model}=this;
	this.cargoHandler = async.cargo(async (raws,cb) => {
		try {
			await model.bulkCreate(raws);
			cb();
		} catch(e) {
			return cb(e);
		}
	});
};

// this will not be immediately saved to the database
// so return a uuid that can be used to look it up later
SignupIntake.prototype.addSignupRaw=function(raw) {
	const id = uuid();
	raw = Object.assign({},{id});
	this.cargoHandler.push(raw);
	return id;
};

module.exports = SignupIntake;
