function AuthHandler(options) {
	options=options||{};
	this.authMethod = options.authMethod;
	this.sqlWrapper = options.sqlWrapper;
	if(!this.authMethod) throw new Error('BLUESTEEL_AUTH_METHOD not set');
	if(!this.sqlWrapper) throw new Error('options.sqlWrapper required');
}

AuthHandler.prototype.initialize = async function(options) {
	if(this.handler) throw new Error('already initialized');
	this.User = this.sqlWrapper.getModel('User');
	switch(this.authMethod) {
		case 'dev': {
			this.handler = new (require('./dev'))(options);
			break;
		}
		case 'firebase': {
			this.handler = new (require('./firebase'))(options);
			break;
		}
		default: throw new Error('invalid authMethod configured: '+this.authMethod);
	}
	return this.handler.initialize(options);
};

AuthHandler.prototype.attachAuthUserToRequest=async function(req) {
	if(!this.handler) throw new Error('failed to initialize');

	// eslint-disable-next-line
	req.authedUser = await this.handler.getAuthUserForRequest(req);
};

AuthHandler.prototype.attachUserToRequest=async function(req) {
	if(!this.handler) throw new Error('failed to initialize');

	const{authedUser}=req;
	if(!authedUser) throw new Error('Missing authedUser definition from req');

	const{external_id,external_source, external={}}=authedUser;
	if(!external_id||!external_source) throw new Error('Missing external_id or external_source from auth source');

	const matches = await this.User.findAll({where:{external_id,external_source}});
	if(matches.length>1) throw new Error('invalid table definition - multiple users returned');

	let user = matches[0];
	if(!user) {
		const {username,email,profile_picture,name}=external;
		user = await this.User.create({external_source,external_id, username,email,profile_picture,name});
	}

	// eslint-disable-next-line
	req.user = user;
};

AuthHandler.prototype.middleware=async function(req,res,next) {
	if(!this.handler) throw new Error('failed to initialize');

	try {
		await this.attachAuthUserToRequest(req);
		await this.attachUserToRequest(req);
	} catch(e) {
		console.error(e);
		return res.status(400).json({error:{message:'Invalid Authorization'}});
	}
	next();
}

module.exports=AuthHandler;
