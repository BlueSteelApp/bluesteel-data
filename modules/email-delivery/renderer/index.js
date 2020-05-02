const Handlebars = require('handlebars');
const cheerio=require('cheerio');

function EmailDeliveryRenderer(options) {
	if(!options) throw new Error('options required');
	let {subject,html_body,text_body,source_code}=options;
	if(!subject) throw new Error('options.subject required');
	if(!text_body) throw new Error('options.text_body required');
	if(!source_code) throw new Error('options.source_code required');

	Object.assign(this,{subject,text_body,html_body,source_code});
}
EmailDeliveryRenderer.prototype.initialize=function() {
	this.subjectTemplate = Handlebars.compile(this.subject);
	this.textTemplate = Handlebars.compile(this.text_body);
	this.htmlTemplate = this.html_body?Handlebars.compile(this.html_body):null;
}

const handlebarsFieldMatcher=/{{[{]?(.*?)[}]?}}/g;

EmailDeliveryRenderer.prototype.getReferencedFields=function(){
	return Object.keys([this.subject,this.text_body,this.html_body].filter(Boolean).reduce((a,b)=>{
		let arr=[...b.matchAll(handlebarsFieldMatcher)].map(d=>d[1]); //match and grab the matching group
		arr.forEach(s=>a[s]=true);
		return a;
	},{}));
}

EmailDeliveryRenderer.prototype.extractLinks=function(opts){
	let {html_body,text_body,rewrite=null}=opts ||{};
	if (!rewrite){rewrite=function(link){return 'https://REWRITTEN?url='+escape(link);};}
	if (!text_body) throw new Error("extractLinks requires at least a text_body option");
	let html_links=[];
	let rewrote_html=null;
	if (html_body){
		const $ = cheerio.load(html_body);
		$('a').each((i, value) => {
			let link = $(value).attr('href');
			html_links.push(link);
			if (rewrite){
					$(value).attr('href',function(i,href){return rewrite(href);});
			}
		});
		rewrote_html=$.html();
	}else{
		console.log("No html content");
	}
	let out={html_links,html_body:rewrote_html};
	return out;
}


EmailDeliveryRenderer.prototype.validate=function() {};

EmailDeliveryRenderer.prototype.render=function({delivery,person}) {
	let allMerges=Object.assign({},{source_code:this.source_code},person,delivery); //delivery info trumps person info
	let text_body=this.textTemplate(allMerges);
	let html_body=this.htmlTemplate?this.htmlTemplate(allMerges):null;

	return {
			subject:this.subjectTemplate(allMerges),
			text_body,
			html_body
	};
};

module.exports = EmailDeliveryRenderer;
