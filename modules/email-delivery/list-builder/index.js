const through2=require('through2');
const through2Batch=require('through2-batch');

function EmailDeliveryListBuilder(options) {
	this.options = options;
	if(!this.options) throw new Error('options required');

	this.email_blast_id = options.email_blast_id;
	if(!this.email_blast_id) throw new Error('options.email_blast_id required');

	this.sqlWrapper = options.sqlWrapper;
	if(!this.sqlWrapper) throw new Error('options.sqlWrapper required');

	this.EmailBlast = this.sqlWrapper.getModel('EmailBlast');
	this.EmailDelivery = this.sqlWrapper.getModel('EmailDelivery');
}

EmailDeliveryListBuilder.prototype.run=async function() {
	const blast = await this.EmailBlast.findByPk(this.email_blast_id);
	if(!blast) throw new Error('invalid email_blast_id: '+this.email_blast_id);

	if(blast.status != 'READY_TO_BUILD') throw new Error('status must be "READY_TO_BUILD"');

	const fullQuery = await blast.getQuery();
	if(!fullQuery) throw new Error('blast does not have associated query');
	if(!fullQuery.query) {
		console.log(JSON.stringify(fullQuery));
		throw new Error('invalid query for blast - query has no definition');
	}

	const originalQuery = fullQuery.query;
	const {conditions} = originalQuery;
	if(!conditions || !conditions.length) throw new Error('query is missing non empty conditions array');

	const query = {
		outputs: [{
			expression: 'id',
			name: 'person_id'
		}, {
			expression: 'email',
			target: 'PersonEmail',
			name: 'person_email'
		}],
		conditions
	};

	const queryRunner = this.sqlWrapper.getQueryRunner({target:'Person', query});
	const stream = await queryRunner.getStream({pageSize:1000});

	blast.status = 'BUILDING_LIST';
	await blast.save({fields:['status']});

	const {EmailDelivery} = this;

	const insertStream = stream.pipe(through2Batch.obj({batchSize:1000}))
		.pipe(through2.obj(async (batch,enc,cb) => {
			batch.forEach(x=>x.email_blast_id = this.email_blast_id);
			try {
				await EmailDelivery.bulkCreate(batch);
			} catch(e) {
				return cb(e);
			}
			return cb();
		}));

	await new Promise((res,rej) => {
		insertStream.once('error',rej);
		insertStream.once('finish',res);
	});

	blast.status = 'LIST_BUILT';
	await blast.save({fields:['status']});
}

module.exports = EmailDeliveryListBuilder;
