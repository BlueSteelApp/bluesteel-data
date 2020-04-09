const through2 = require('through2');
const debug = require('debug')('email-delivery-engine-wrapper');

function EmailDeliveryEngineWrapper(options) {
	this.options = options;
	if(!this.options) throw new Error('options required');

	this.engine_type = options.engine_type;
	if(!this.engine_type) throw new Error('options.engine_type required');

	this.email_blast_id = options.email_blast_id;
	if(!this.email_blast_id) throw new Error('options.email_blast_id required');

	this.sqlWrapper = options.sqlWrapper;
	if(!this.sqlWrapper) throw new Error('options.sqlWrapper required');

	this.EmailBlast = this.sqlWrapper.getModel('EmailBlast');
	this.EmailDelivery = this.sqlWrapper.getModel('EmailDelivery');
}

EmailDeliveryEngineWrapper.prototype.getEngine=async function() {
	const email_blast = await this.EmailBlast.findByPk(this.email_blast_id);
	if(!email_blast) throw new Error('invalid EmailBlast id: '+this.email_blast_id);

	switch(this.engine_type) {
		case 'dev': {
			const DevNodeMailerEngine=require('./dev');
			let engine = new DevNodeMailerEngine({
				email_blast
			});
			await engine.initialize();
			return engine;
		}
	}
	throw new Error('invalid engine_type:'+this.engine_type);
}

EmailDeliveryEngineWrapper.prototype.run=async function() {
	const blast = await this.EmailBlast.findByPk(this.email_blast_id);
	if(!blast) throw new Error('invalid EmailBlast id: '+this.email_blast_id);

	if(blast.status != 'LIST_BUILT') throw new Error('EmailBlast status != LIST_BUILT, aborting');
	blast.status = 'SENDING';

	await blast.save();

	const engine = await this.getEngine();

	const queryStream = this.sqlWrapper.streamQuery(this.EmailDelivery, {
		where:{email_blast_id: this.email_blast_id, status: 'QUEUED'}
	});

	const deliveryStream = queryStream
		.pipe(engine.getEmailDeliveryStream())
		.pipe(through2.obj(async (o,enc,cb) => {
			const{status}=o;
			if(!status) debug('missing status for',o);
			await o.save();
			return cb();
		}));

	return new Promise((res,rej) => {
		deliveryStream.on('error', rej);
		deliveryStream.on('finish', res);
	});
}

module.exports=EmailDeliveryEngineWrapper;
