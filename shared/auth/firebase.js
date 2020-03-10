const firebaseAdmin=require('firebase-admin');

const {FIREBASE_CONF_PATH}=process.env;

module.exports=async function(options) {
	let config = options.config;
	if(!config) {
		if(!FIREBASE_CONF_PATH) throw new Error('process var FIREBASE_CONF_PATH not set');
		console.log('loading firebase config from',FIREBASE_CONF_PATH);
		config = require(FIREBASE_CONF_PATH);
	}
	const serviceAccount = firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(serviceAccount),
		databaseURL: "https://fraktureconsole.firebaseio.com"
	});

	return async (req) => {
		const{headers}=req;
		if(!headers.Authorization) throw new Error('Missing Authorization header');
		const{Authorization}=headers;
		const idToken=Authorization.replace('BEARER ','');
		let decoded;
		try {
			decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
		} catch(e) {
			console.error(e);
			throw new Error('Failed to authorize');
		}
		const{user_id}=decoded;
		if(!user_id) {
			console.error(JSON.stringify(decoded));
			throw new Error('Failed to get proper authorization');
		}
		return decoded;
	};
};
