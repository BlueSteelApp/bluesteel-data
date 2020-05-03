const Sequelize=require('Sequelize');
const {gql}=require('apollo-server-express');
const async=require('async');
const querystring=require('querystring');

// VALUES PLACED HERE CANNOT CHANGE ORDER.
// ONLY NEW VALUES CAN BE ADDED.
// EMAIL STATUS WILL ONLY MOVE FORWARD
const STATUS=[
	'QUEUED',
	'SENT', //Message has been delivered to the delivery engine.  Assume delivery unless changed to FAILED
	'OPENED',
	'CLICKED',
	'HARD_BOUNCE',
	'SOFT_BOUNCE',
	'UNSUBSCRIBE',
	'REJECTED', //message has been rejected by the delivery system -- usually invalid emails
	'FAILED' //message could not be delivered by the delivery system
];
const INVERSE_STATUS={};
STATUS.forEach((k, i) => {
	INVERSE_STATUS[k]=i;
	INVERSE_STATUS[k.toLowerCase()]=i;
});
const {OPENED,CLICKED}=INVERSE_STATUS;

const EVENTS={
	'OPEN':0,
	'CLICK':1
};
function getEventId(e){
	switch(typeof e){
		case 'number': return e;
		case 'string':{
			if (parseInt(e)==e) return parseInt(e);
			break;
		}
		default: return EVENTS[e.toUpperCase()];
	}
}


const models = {
	email_delivery: {
		name: 'EmailDelivery',
		tableName: 'email_delivery',
		fields: {
			person_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				unique: 'person-email-blast-id'
			},
			email_blast_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				unique: 'person-email-blast-id'
			},
			person_email: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			status: {
				type: Sequelize.SMALLINT(),
				allowNull: false,
				gqlType: 'EmailDeliveryStatus',
				defaultValue: 0,
				validate: {
					isValid: value => {
						if(value < 0 || value > STATUS.length) throw new Error('invalid value - must be between 0 and '+STATUS.length);
					}
				},
				gqlSet: false
			}
		},
		// these should only be modified by the background processes and the
		// delivery processor
		allow_update: false,
		allow_create: false,
		associations: [{
			name: 'Person',
			options: {
				type: 'ManyToOne',
				source_field: 'person_id'
			}
		},{
			name: 'EmailBlast',
			options: {
				type: 'ManyToOne',
				source_field: 'email_blast_id'
			}
		}]
	},
	email_delivery_event: {
		name: 'EmailDeliveryEvent',
		tableName: 'email_delivery_event',
		fields: {
			email_delivery_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			link_id: {
				type: Sequelize.SMALLINT(11),
				allowNull: true
			},
			event: {
				type: Sequelize.SMALLINT(),
				allowNull: false,
				gqlType: 'EmailDeliveryEventType',
				defaultValue: 0,
				validate: {
					isValid: value => {
						if(value < 0 || getEventId(value)===undefined) throw new Error('invalid event_id');
					}
				},
				gqlSet: false
			}
		},
		// these should only be modified by the background processes and the
		// delivery processor
		allow_update: false,
		allow_create: false,
		associations: [{
			name: 'Person',
			options: {
				type: 'ManyToOne',
				source_field: 'person_id'
			}
		},{
			name: 'EmailBlast',
			options: {
				type: 'ManyToOne',
				source_field: 'email_blast_id'
			}
		}]
	},
};

// click/open tokens = the email_delivery table .id field
// expand to use an actual persistent queue later
function getEndpoints({sqlWrapper}) {
	const EmailDelivery=sqlWrapper.getModel('EmailDelivery');
	const EmailDeliveryEvent=sqlWrapper.getModel('EmailDeliveryEvent');

	async function addEmailEvent(email_delivery_id,link_id,event) {
		if(email_delivery_id == null) {
			console.error('invalid empty email_delivery_id:');
			return;
		}
		const delivery = await EmailDelivery.findByPk(email_delivery_id);
		if(!delivery) {
			console.error('invalid email_delivery_id:',email_delivery_id);
			return;
		}
		let event_id=getEventId(event);

		await EmailDeliveryEvent.create({email_delivery_id,link_id,event_id});
		return;
	}

	async function updateDeliveryStatus(token,status) {
		const email_delivery_id = token;
		if(email_delivery_id == null) {
			console.error('invalid empty email_delivery_id:');
			return;
		}
		const delivery = await EmailDelivery.findByPk(email_delivery_id);
		if(!delivery) {
			console.error('invalid email_delivery_id:',email_delivery_id);
			return;
		}
		if(delivery.status >= status) {
			console.log('status',delivery.status,'already >',status);
			return;
		}

		delivery.status = status;
		await delivery.save();
		return;
	}

	const openQueue = async.queue(async (email_delivery_id,cb) => {
		try {
			await updateDeliveryStatus(email_delivery_id,OPENED);
			await addEmailEvent(email_delivery_id,null,EVENTS.OPEN);
		} catch(e) {
			console.error(e);
		}
		cb();
	},2);

	const clickQueue = async.queue(async ({email_delivery_id,link_id=null},cb) => {
		try {
			await updateDeliveryStatus(email_delivery_id,CLICKED);
			await addEmailEvent(email_delivery_id,link_id,EVENTS.CLICK);
		} catch(e) {
			console.error(e);
		}
		cb();
	},2);

	return [{
		path: '/delivery/open/:email_delivery_id',
		handle: (req,res) => {
			const {email_delivery_id}=req.params;
			openQueue.push(email_delivery_id);
			return res.jsonp('opened');
		}
	}, {
		path: '/delivery/click/:email_delivery_id/:link_id',
		handle: async (req,res) => {
			const {email_delivery_id,link_id}=req.params;
			const {uri}=querystring.parse(req.query);
			clickQueue.push({email_delivery_id,link_id});
			return res.redirect(uri);
		}
	}];
}

module.exports={
	STATUS,
	INVERSE_STATUS,
	getEndpoints,

	name: 'EmailDelivery',
	models,
	dir: __dirname,
	gql: () => {
		return {
			typeDefs: gql`
			enum EmailDeliveryStatus {
				${STATUS.join('\n')}
			}
			enum EmailDeliveryEventType {
				${Object.keys(EVENTS).join('\n')}
			}
			`,
			resolvers:{
				EmailDeliveryStatus: INVERSE_STATUS,
				EmailDeliveryEventType: EVENTS
			}
		}
	},
	jobs: [{
		type: 'email_build_list',
		run: (job, {sqlWrapper}) => {
			const email_blast_id = job.job_definition_id;
			const EmailDeliveryListBuilder=require('./list-builder');
			const builder = new EmailDeliveryListBuilder({
				sqlWrapper,
				email_blast_id
			});
			return builder.run();
		}
	}, {
		type: 'email_send',
		run: (job, {sqlWrapper}) => {
			const email_blast_id = job.job_definition_id;
			const EmailDeliveryEngineWrapper=require('./engine');
			const builder = new EmailDeliveryEngineWrapper({
				sqlWrapper,
				email_blast_id,
				engine_type: process.env.DELIVERY_ENGINE_TYPE
			});
			return builder.run();
		}
	}]
};
