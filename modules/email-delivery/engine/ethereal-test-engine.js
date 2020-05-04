const nodemailer = require('nodemailer');
const through2 = require('through2');

function EtherealTestEngine(options) {
	this.options = options;
	this.email_blast = options.email_blast;
	if(!this.email_blast) throw new Error('email_blast is required');
}

// https://nodemailer.com/about/#example
EtherealTestEngine.prototype.initialize = async function() {
	const testAccount = this.testAccount = await nodemailer.createTestAccount();

	console.log('ethereal test account:', testAccount);

	this.transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass // generated ethereal password
		}
	});
}

// https://community.nodemailer.com/delivering-bulk-mail/
EtherealTestEngine.prototype.getEmailDeliveryStream = function() {
	const{transporter}=this;
	return through2.obj(async (delivery,enc,cb) => {
		const {email_delivery_id,from_name,from_email,to,subject,text,html}=delivery;
		if (!from_name || !from_email) throw new Error("Delivery requires a from_name and from_email");
		let from=from_name+"<"+from_email+">";// sender address;
		console.log("From=",from);
		let info;
		try {
			info = await transporter.sendMail({
				from,
				to, // list of receivers
				subject: subject, // Subject line
				text, // plain text body
				html // html body
			});
		} catch(e) {
			return cb(e);
		}
		console.log(info);

		if(info.accepted.length == 1 && !info.rejected.length) {
			return cb(null, {status: 'SENT', email_delivery_id,devEngineInfo: info});
		} else {
			return cb(null, {status: 'FAILED',email_delivery_id});
		}
	});
}

module.exports=EtherealTestEngine;
