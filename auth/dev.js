function DevAuth() {}
DevAuth.prototype.initialize=function() {};
DevAuth.prototype.getAuthUserForRequest=async function() {
	return {
		external_source: 'dev',
		external_id: 'dev',
		external: {
			email: 'dev-user@dev.com',
			username: 'dev-user',
			name: 'Dev User',
			profile_picture: 'https://avatars0.githubusercontent.com/u/60575022?s=120&v=4'
		}
	};
};

module.exports=DevAuth;
