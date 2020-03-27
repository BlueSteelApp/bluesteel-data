const firebaseAdmin=require('firebase-admin');

const {FIREBASE_CONF_PATH}=process.env;
if(!FIREBASE_CONF_PATH) throw new Error('FIREBASE_CONFIG_PATH is a required environment variable');

function FirebaseAuth() {
	this.serviceAccount = require(FIREBASE_CONF_PATH);
}
FirebaseAuth.prototype.initialize=function() {
	this.firebase=firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert(this.serviceAccount)
	});
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
