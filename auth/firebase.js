const firebaseAdmin=require('firebase-admin');

const {FIREBASE_CONF_PATH, FIREBASE_CLIENT_CONFIG_PATH}=process.env;
if(!FIREBASE_CONF_PATH) throw new Error('FIREBASE_CONFIG_PATH is a required environment variable');

function FirebaseAuth() {
	this.serviceAccount = require(FIREBASE_CONF_PATH);
}
FirebaseAuth.prototype.initialize=function() {
	this.firebase=firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(this.serviceAccount)
	});

	const rawClientConfig = require(FIREBASE_CLIENT_CONFIG_PATH);
	const clientConfig = this.clientConfig = {};
	const fields = [
		// the fields normally used in firebase
		'apiKey',
		'authDomain',
		'databaseURL',
		'projectId',
		'storageBucket',
		'messagingSenderId',
		'appId',

		// the fields used by the UI
		'signInOptions'
	];
	const missing = fields.filter(x=>!clientConfig[x]);
	if(missing.length) throw new Error('Missing fields in firebase client config: '+missing.join(', '));
	const extra = Object.keys(rawClientConfig).filter(x => fields.indexOf(x) != -1);
	if(extra.length) throw new Error('Found extra fields in firebase client config: '+extra.join(', '));

	fields.forEach(x => clientConfig[x]=rawClientConfig[x]);
};
FirebaseAuth.prototype.config=function() {
	return this.clientConfig;
};
FirebaseAuth.prototype.getAuthUserForRequest=async function(req) {
	const Authorization=req.header('Authorization');
	if(!Authorization) throw new Error('missing Authorization header');
	const clientToken=Authorization.slice('BEARER '.length);
	const firebaseUser = await this.firebase.auth().verifyIdToken(clientToken);
	if(!firebaseUser) throw new Error('invalid user');
	return {
		external_source: 'firebase',
		external_id: firebaseUser.user_id,
		external: {
			email: firebaseUser.email,
			username: firebaseUser.email,
			name: firebaseUser.name,
			profile_picture: firebaseUser.picture
		}
	};
};
module.exports=FirebaseAuth;
