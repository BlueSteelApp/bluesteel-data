const assert=require('assert');
const faker=require('faker');
const EmailDeliveryRenderer = require('./');
require("dotenv").config({path:'../../../.env'});

/*
function delay(t, v) {
   return new Promise(function(resolve) {
       setTimeout(resolve.bind(null, v), t)
   });
}
*/

describe('email render wrapper', function() {
	let email_blast={
		id: 1,
		message_set_id: 1,
		subject: 'Hello {{given_name}}',
		from_name: 'test-from-name',
		from_email: 'test-from@steamengine.io',
		source_code:'EM_123_ABC',
		text_body: `Hello {{given_name}},

here's a link: http://google.com?utm_source={{source_code}}

and here's another link: http://google.com?utm_source={{source_code}}`,
		html_body: `Hello {{given_name}},
<p>Here's a link <a href="http://google.com?utm_source={{source_code}}">to google</a></p>
<p>Here's another link <a href="http://google.com?utm_source={{source_code}}">to google</a></p>`,
		status: 'LIST_BUILT'
	};

	let delivery={id:123,email_blast_id:1, person_id:1, person_email: 'larry@zoolander.com', status: 0};
	let person={given_name:"Larry", family_name:"Zoolander",email:'larry@zoolander.com'};

	const renderer = new EmailDeliveryRenderer(email_blast);
	renderer.initialize();
	it('should return the handlebars merge fields', function() {
		let fields=renderer.getReferencedFields();
		assert.deepEqual(fields,["given_name","source_code"]);
	});
	it('should merge person information into an email blast subject', async function() {
		let out=await renderer.render({delivery,person});
		let {subject}=out;
		assert.deepEqual({subject:`Hello Larry`},{subject});
	});
	it('should get links', function() {
		let links=renderer.getLinks();
		assert.deepEqual([
				{location:"text_body",href:"http://google.com?utm_source={{source_code}}"},
				{location:"text_body",href:"http://google.com?utm_source={{source_code}}"},
				{location:"html_body",href:"http://google.com?utm_source={{source_code}}"},
				{location:"html_body",href:"http://google.com?utm_source={{source_code}}"}
			],links);
	});
	it('should render the html',async function() {
		let {text,html}=await renderer.render({delivery,person});
		//console.log("Text Body output=",text_body);
		//console.log("HTML Body output=",html_body);
		//
		assert.equal(text,`Hello Larry,

here's a link: http://localhost:5000/delivery/click/123/0?uri=http%3A//google.com%3Futm_source%3DEM_123_ABC

and here's another link: http://localhost:5000/delivery/click/123/1?uri=http%3A//google.com%3Futm_source%3DEM_123_ABC`);
		assert.equal(html,`<html><head></head><body>Hello Larry,
<p>Here&apos;s a link <a href="http://localhost:5000/delivery/click/123/2?uri=http%3A//google.com%3Futm_source%3DEM_123_ABC">to google</a></p>
<p>Here&apos;s another link <a href="http://localhost:5000/delivery/click/123/3?uri=http%3A//google.com%3Futm_source%3DEM_123_ABC">to google</a></p><img src="http://localhost:5000/delivery/open/123"></body></html>`);
	});

	it('should render 10K messages in <1 second',async function(){
		console.log("Generating fake data ....");
		let deliveries=Array.apply(null, Array(10000)).map((e,i)=>{
			let email=faker.internet.email();
			return {
				delivery:{
					id:i+1000000,
					person_id:i,
					person_email:email,
					status:0
				},
				person:{
					person_id:i,
					given_name:faker.name.firstName(),
					family_name:faker.name.lastName(),
					email,
					phone:faker.phone.phoneNumber(),
					street_1:faker.address.streetAddress(),
					street_2:faker.address.secondaryAddress(),
					city:faker.address.city(),
					region:faker.address.stateAbbr(),
					postal_code:faker.address.zipCode()
				}
			}
		});

		console.log("Finished generating data, executing performance test");

		let start=new Date().getTime();

		let output=await Promise.all(deliveries.map(d=>{
			return renderer.render(d)
		}));
		let end=new Date().getTime();
		console.log("Sample random output",output[10]);
		console.log("Sample random output",output[100]);
		console.log("Sample random output",output[1000]);
		console.log("Total time=",(end-start)," millis");
		assert.ok((end-start)<1000);
	});
});
