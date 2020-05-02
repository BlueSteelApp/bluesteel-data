const Handlebars = require('handlebars');

function EmailDeliveryRenderer(options) {
	if(!options) throw new Error('options required');
	let {subject,html_body,text_body}=options;
	if(!subject) throw new Error('options.subject required');
	if(!text_body) throw new Error('options.text_body required');
	if(!text_body) throw new Error('options.text_body required');
	Object.assign(this,{subject,text_body,html_body});
}
EmailDeliveryRenderer.prototype.initialize=function() {
	this.subjectTemplate = Handlebars.compile(this.subject);
	this.textTemplate = Handlebars.compile(this.text_body);
	this.htmlTemplate = Handlebars.compile(this.html_body);
}

const handlebarsFieldMatcher=/{{[{]?(.*?)[}]?}}/g;

EmailDeliveryRenderer.prototype.getReferencedFields=function(){
	return Object.keys([this.subject,this.text_body,this.html_body].filter(Boolean).reduce((a,b)=>{
		let arr=[...b.matchAll(handlebarsFieldMatcher)].map(d=>d[1]); //match and grab the matching group
		arr.forEach(s=>a[s]=true);
		return a;
	},{}));
}

EmailDeliveryRenderer.prototype.validate=function() {};

EmailDeliveryRenderer.prototype.render=function({delivery,person}) {
	let allMerges=Object.assign({},person,delivery); //delivery info trumps person info
	return {
			subject:this.subjectTemplate(allMerges),
			html_body:this.textTemplate(allMerges),
			text_body:this.htmlTemplate(allMerges),
	};
};


module.exports = EmailDeliveryRenderer;
