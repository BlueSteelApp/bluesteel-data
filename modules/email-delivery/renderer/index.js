const Handlebars = require('handlebars');
const cheerio=require('cheerio');
const through2=require('through2');


function EmailDeliveryRenderer(options) {
	if(!options) throw new Error('options required');
	let {from_name,from_email,subject,html_body,text_body,source_code}=options;
	let o={from_name,from_email,subject,html_body,text_body,source_code};
	let missing=Object.keys(o).filter(k=>!o[k]);
	if (missing.length>0) throw new Error("Email Delivery -- missing fields:"+missing.join());

	Object.assign(this,o);
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

/*
accepts an object with
{delivery:{<delivery info>}
 person:{person merge info}
}

and returns back content suitable for sending


*/
EmailDeliveryRenderer.prototype.getRenderStream=function(){
	return through2.obj(async (o,enc,cb) => {
		let out=await this.render(o);
		return cb(null,out);
	});
}

EmailDeliveryRenderer.prototype.render=async function(o) {
	if (!o || !o.dataValues || !o.dataValues.Person){
			throw new Error("Email rendrered, invalid data coming from stream");
	}
	let vals=o.dataValues;
	let Person=o.dataValues.Person;
	let allMerges=Object.assign({},Person);
	for (let k in vals){
		if (typeof vals[k]!='object') allMerges[k]=vals[k];
	}
	let email_delivery_id=allMerges.id;
	if (allMerges.id!=o.dataValues.id) throw new Error("Invalid merge, email_delivery_id is not correct");
	if (!email_delivery_id){
		console.error("EmailDelivery, no email_delivery_id found in ",o);
		throw new Error("A delivery.id, the unique id of the delivery, is required");
	}
	let to=allMerges.person_email;
	if (!to){
		throw new Error("No person_email available");
	}
	allMerges.origin_source_code=o.source_code;
	allMerges.source_code=this.source_code;

	//First merge in the merge fields
	allMerges._links=this.linkTemplates.map(f=>f(allMerges));

	allMerges._open_image=await this.openImageURL(email_delivery_id);

	//Then if we have a link rewriter, do that.
	const rewriteLinks = async () => {
		return Promise.all(allMerges._links.map((l,i)=>this.linkRewriter(l,email_delivery_id,i)))
	};

	return rewriteLinks().then(links=>{
		allMerges._links=links;

		let subject=this.subjectTemplate(allMerges);
		let text=this.textTemplate(allMerges);
		let html=this.htmlTemplate?this.htmlTemplate(allMerges):null;
		return {
				email_delivery_id,
				from_name:this.from_name,
				from_email:this.from_email,
				to,
				subject,
				text,
				html};
	});
};

module.exports = EmailDeliveryRenderer;
