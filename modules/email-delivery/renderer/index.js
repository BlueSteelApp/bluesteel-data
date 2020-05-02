const Handlebars = require('handlebars');
const cheerio=require('cheerio');

function EmailDeliveryRenderer(options) {
	if(!options) throw new Error('options required');
	let {subject,html_body,text_body,source_code,linkRewriter}=options;
	if(!subject) throw new Error('options.subject required');
	if(!text_body) throw new Error('options.text_body required');
	if(!source_code) throw new Error('options.source_code required');

	Object.assign(this,{subject,text_body,html_body,source_code,linkRewriter});
}
EmailDeliveryRenderer.prototype.initialize=function() {
	this.subjectTemplate = Handlebars.compile(this.subject);

	//Find all the referenced fields first
	this.referencedFields=this._getReferencedFields();

	//Turn links into handlebars fields
	let {links,text_body,html_body}=this.convertLinksToHandlebars(this);
	console.log("Text body=",text_body);
	//This contains the actual links in the content
	this.links=links;
	this.linkTemplates=links.map(l=>{return Handlebars.compile(l.href);});

	this.textTemplate = Handlebars.compile(text_body);
	this.htmlTemplate = html_body?Handlebars.compile(html_body):null;
}

const handlebarsFieldMatcher=/{{[{]?(.*?)[}]?}}/g;

EmailDeliveryRenderer.prototype._getReferencedFields=function(){
	return Object.keys([this.subject,this.text_body,this.html_body].filter(Boolean).reduce((a,b)=>{
		let arr=[...b.matchAll(handlebarsFieldMatcher)].map(d=>d[1]); //match and grab the matching group
		arr.forEach(s=>a[s]=true);
		return a;
	},{}));
}
EmailDeliveryRenderer.prototype.getReferencedFields=function(){
	if (!this.referencedFields) throw new Error("Please initialize before getting referencedFields");
	return this.referencedFields;
}

EmailDeliveryRenderer.prototype.getLinks=function(){
	if (!this.links) throw new Error("Please initialize before getting links");
	return this.links;
}

const urlMatcher=/((http(s)?(:\/\/))+(www\.)?([\w\-./])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:?!@^$ -]/g;

EmailDeliveryRenderer.prototype.convertLinksToHandlebars=function(opts){
	let {html_body,text_body}=opts ||{};
	if (!text_body) throw new Error("extractLinks requires at least a text_body option");
	let links=[];
	let rewrote_text=(text_body || "").replace(urlMatcher,href=>{
		links.push({location:"text_body",href:href});
		return "{{{_links.["+(links.length-1)+"]}}}";
	});
	let rewrote_html=null;

	if (html_body){
		const $ = cheerio.load(html_body);
		$('a').each((i, value) => {
			let href = $(value).attr('href');
			links.push({location:"html_body",href:href.trim()});
			$(value).attr('href',"{{{_links.["+(links.length-1)+"]}}}");
		});
		rewrote_html=$.html();
	}

	let out={
			links,
			text_body:rewrote_text,
			html_body:rewrote_html
	};
	return out;
}


EmailDeliveryRenderer.prototype.validate=function() {};

EmailDeliveryRenderer.prototype.render=function({delivery,person}) {
	let allMerges=Object.assign({},{source_code:this.source_code},person,delivery); //delivery info trumps person info
	//First merge in the merge fields
	allMerges._links=this.linkTemplates.map(f=>f(allMerges));
	//Then if we have a link rewriter, do that.
	if (this.linkRewriter) allMerges._links=allMerges._links.map((l,i)=>this.linkRewriter(l,i));

	let text_body=this.textTemplate(allMerges);
	let html_body=this.htmlTemplate?this.htmlTemplate(allMerges):null;

	return {
			subject:this.subjectTemplate(allMerges),
			text_body,
			html_body
	};
};

module.exports = EmailDeliveryRenderer;
