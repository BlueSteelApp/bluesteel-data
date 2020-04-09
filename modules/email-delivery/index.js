const Sequelize=require('Sequelize');
const {gql}=require('apollo-server-express');

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
			build: (EmailDelivery,Person) => {
				EmailDelivery.belongsTo(Person,{
					validate:false,
					through:'person_id',
					as: 'Person'
				});
				Person.hasMany(EmailDelivery,{
					validate:false,
					as: 'EmailDelivery'
				});
			}
		},{
			name: 'EmailBlast',
			build: (EmailDelivery,EmailBlast) => {
				EmailDelivery.belongsTo(EmailBlast,{
					validate:false,
					through:'person_id',
					as: 'EmailBlast'
				});
				EmailBlast.hasMany(EmailDelivery,{
					validate:false,
					as: 'EmailDelivery'
				});
			}
		}]
	},
};

module.exports={
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
	// }, {
	// 	type: 'email_send',
	// 	run: (job, {sqlWrapper}) => {}
	}]
};
