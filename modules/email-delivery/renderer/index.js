const Handlebars = require('handlebars');

function EmailDeliveryRenderer(options) {
	if(!options) throw new Error('options required');

	this.sqlWrapper = options.sqlWrapper;
	if(!this.sqlWrapper) throw new Error('options.sqlWrapper required');
	this.email_blast_id = options.email_blast_id;
	if(!this.email_blast_id) throw new Error('options.email_blast_id required');

	this.EmailBlast = this.sqlWrapper.getModel('EmailBlast');
}

EmailDeliveryRenderer.getReferencedFields=function() {

}

EmailDeliveryRenderer.initialize=function() {
	this.email_blast = this.EmailBlast.findByPk(this.email_blast_id);
	if(!this.email_blast) throw new Error('invalid email_blast_id: '+this.email_blast_id);

	const {text_body,html_body}=this.email_blast;

	this.textTemplate = Handlebars.compile(text_body);
	this.htmlTemplate = Handlebars.compile(html_body);
}

EmailDeliveryRenderer.validate=function() {
	const {text_body,html_body}=this.email_blast;
	const 
}

module.exports = EmailDeliveryRenderer;
