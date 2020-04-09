const nodemailer = require('nodemailer');
const through2 = require('through2');

function NodeMailerEngine(options) {
	this.options = options;
	this.email_blast = options.email_blast;
}

// https://nodemailer.com/about/#example
NodeMailerEngine.prototype.initialize = async function() {
	const testAccount = this.testAccount = await nodemailer.createTestAccount();

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

NodeMailerEngine.prototype.getEmailDeliveryStream = function() {
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
		return cb(null, {status: 'SENT'});
	});
}

module.exports=NodeMailerEngine;
