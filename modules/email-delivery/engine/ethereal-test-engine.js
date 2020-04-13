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
	const{email_blast, transporter}=this;
	const {html_body,text_body}=email_blast;
	return through2.obj(async (delivery,enc,cb) => {
		let info;
		try {
			info = await transporter.sendMail({
				from: email_blast.from, // sender address
				to: delivery.person_email, // list of receivers
				subject: email_blast.subject, // Subject line
				text: text_body, // plain text body
				html: html_body // html body
			});
		} catch(e) {
			return cb(e);
		}
		console.log(info);

		if(info.accepted.length == 1 && !info.rejected.length) {
			return cb(null, {status: 'SENT', person_id:delivery.person_id, devEngineInfo: info});
		} else {
			return cb(null, {status: 'ERROR'});
		}
	});
}

module.exports=EtherealTestEngine;
