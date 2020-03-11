const {BLUESTEEL_AUTH_METHOD}=process.env;
module.exports=function(options) {
	const auth_method = options.auth_method || BLUESTEEL_AUTH_METHOD;
	if(!auth_method) throw new Error('BLUESTEEL_AUTH_METHOD not set');

	switch(auth_method) {
	case 'firebase': return require('firebase')(options);
	}

	throw new Error('invalid auth_method configured: '+auth_method);
};
