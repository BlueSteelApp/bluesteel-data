const Sequelize=require('sequelize');
const SignupIntake=require('./intake');

const models={
	signup_raw: {
		name:'SignupRaw',
		tableName: 'signup_raw',
		fields: {
			given_name: {
				type: Sequelize.STRING(255),
				allowNull: true
			},
			family_name: {
				type: Sequelize.STRING(255),
				allowNull: true
			},

			email: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			phone: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},

			source_code: {
				type: Sequelize.STRING(255),
				allowNull: true
			}
		}
	},
};

async function getEndpoints({sqlWrapper}) {
	const intake = new SignupIntake({sqlWrapper});
	await intake.initialize();
	return [{
		path: '/signup',
		method: 'post',
		handle: async (req,res) => {
			const {given_name,family_name,source_code,phone,email}=req.body;
			if(![given_name,family_name,source_code,phone,email].find(x=>x)) {
				console.log('no data present in body:',req.body);
				return res.status(400).json({error:{message:'No data present in body'}});
			}
			try {
				const signup_id = await intake.addSignupRaw({given_name,family_name,source_code,phone,email});
				return res.status(200).jsonp({signup_id});
			} catch(e) {
				console.error(e);
				return res.status(400).json({error:{message:'Failed to process signup'}});
			}
		}
	}];
}

module.exports={
	name: 'Signups',
	dir: __dirname,
	models,
	getEndpoints
};
