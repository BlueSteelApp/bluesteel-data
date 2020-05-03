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
	this.BLUESTEEL_EMAIL_DELIVERY_ENDPOINT=process.env.BLUESTEEL_EMAIL_DELIVERY_ENDPOINT;
	if (!this.BLUESTEEL_EMAIL_DELIVERY_ENDPOINT){
		console.error(Object.keys(process.env).filter(d=>d.indexOf('BLUESTEEL_')==0));
		throw new Error("You must set a BLUESTEEL_EMAIL_DELIVERY_ENDPOINT");
	}

	this.subjectTemplate = Handlebars.compile(this.subject);

	//Find all the referenced fields first
	this.referencedFields=this._getReferencedFields();

	//Turn links into handlebars fields
	let {links,text_body,html_body}=this.convertLinksToHandlebars(this);
	//This contains the actual links in the content
	this.links=links;
	this.linkTemplates=links.map(l=>{return Handlebars.compile(l.href);});

	this.textTemplate = Handlebars.compile(text_body);
	this.htmlTemplate = html_body?Handlebars.compile(html_body):null;
}

EmailDeliveryRenderer.prototype.linkRewriter=function(link,delivery_id,i){
	return Promise.resolve(this.BLUESTEEL_EMAIL_DELIVERY_ENDPOINT+'/click/'+delivery_id+'/'+i+'?uri='+escape(link));
	//return delay(100).then(()=>{return out;});
}
EmailDeliveryRenderer.prototype.openImageURL=function(delivery_id){
	return Promise.resolve(this.BLUESTEEL_EMAIL_DELIVERY_ENDPOINT+'/open/'+delivery_id);
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

const textUrlMatcher=/((http(s)?(:\/\/))+(www\.)?([\w\-./])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:?!@^$\s -]/g;

EmailDeliveryRenderer.prototype.convertLinksToHandlebars=function(opts){
	let {html_body,text_body}=opts ||{};
	if (!text_body) throw new Error("extractLinks requires at least a text_body option");
	let links=[];
	let rewrote_text=(text_body || "").replace(textUrlMatcher,href=>{
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
		$('body').append('<img src="{{{_open_image}}}"/>');

		rewrote_html=$.html().trim();
	}

	let out={
			links,
			text_body:rewrote_text,
			html_body:rewrote_html
	};
	return out;
}


EmailDeliveryRenderer.prototype.validate=function() {};

EmailDeliveryRenderer.prototype.render=async function(o) {
	let {delivery,person}=o;
	if (!delivery.id){
		console.error("Invalid options",o);
		throw "A delivery.id, the unique id of the delivery, is required";
	}
	let allMerges=Object.assign({},{source_code:this.source_code},person,delivery); //delivery info trumps person info
	//First merge in the merge fields
	allMerges._links=this.linkTemplates.map(f=>f(allMerges));

	allMerges._open_image=await this.openImageURL(delivery.id);

	//Then if we have a link rewriter, do that.
	const rewriteLinks = async () => {
		return Promise.all(allMerges._links.map((l,i)=>this.linkRewriter(l,delivery.id,i)))
	};

	return rewriteLinks().then(links=>{
		allMerges._links=links;

		let text_body=this.textTemplate(allMerges);
		let html_body=this.htmlTemplate?this.htmlTemplate(allMerges):null;
		return {
				subject:this.subjectTemplate(allMerges),
				text_body,
				html_body
		};
	});
};

module.exports = EmailDeliveryRenderer;
