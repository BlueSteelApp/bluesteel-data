const Sequelize=require('Sequelize');
const {gql}=require('apollo-server-express');
const async=require('async');

// VALUES PLACED HERE CANNOT CHANGE ORDER.
// ONLY NEW VALUES CAN BE ADDED.
const STATUS=[
	'QUEUED',
	'SENT',
	'OPENED',
	'CLICKED',
	'HARD_BOUNCE',
	'SOFT_BOUNCE',
	'UNSUBSCRIBE'
];
const INVERSE_STATUS={};
STATUS.forEach((k, i) => {
	INVERSE_STATUS[k]=i;
	INVERSE_STATUS[k.toLowerCase()]=i;
});
const {OPENED,CLICKED}=INVERSE_STATUS;

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
};

// click/open tokens = the email_delivery table .id field
// expand to use an actual persistent queue later
function getEndpoints({sqlWrapper}) {
	const EmailDelivery=sqlWrapper.getModel('EmailDelivery');

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

	const openQueue = async.queue(async (token,cb) => {
		try {
			await updateDeliveryStatus(token,OPENED);
		} catch(e) {
			console.error(e);
		}
		cb();
	},2);

	const clickQueue = async.queue(async (token,cb) => {
		try {
			await updateDeliveryStatus(token,CLICKED);
		} catch(e) {
			console.error(e);
		}
		cb();
	},2);

	const clickCache={};
	const Link = sqlWrapper.getModel('Link');
	async function getClickTarget(id) {
		if(clickCache[id]) return clickCache[id];
		const link = await Link.findByPk(id);
		// eslint-disable-next-line require-atomic-updates
		clickCache[id] = link;
		return link;
	}

	return [{
		path: '/delivery/open/:token',
		handle: (req,res) => {
			const {token}=req.params;
			openQueue.push(token);
			return res.jsonp('opened');
		}
	}, {
		path: '/delivery/click/:click_id/:token',
		handle: async (req,res) => {
			const {click_id,token}=req.params;
			clickQueue.push(token);
			const link = await getClickTarget(click_id);
			if(!link) return res.jsonp({invalid:true});
			const {uri} = link;
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
			`,
			resolvers:{
				EmailDeliveryStatus: INVERSE_STATUS
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
