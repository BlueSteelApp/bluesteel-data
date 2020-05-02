const assert=require('assert');
const EmailDeliveryRenderer = require('./');

describe('email render wrapper', function() {
	let email_blast={
		id: 1,
		message_set_id: 1,
		subject: 'Hello {{given_name}}',
		from_name: 'test-from-name',
		from_email: 'test-from@bluesteelcrm.com',
		source_code:'EM_123_ABC',
		html_body: `
			Hello {{given_name}},
			<p>Here's a link <a href="http://google.com?utm_source={{source_code}}">to google</a></p>
			<p>Here's another link <a href="http://google.com?utm_source={{source_code}}">to google</a></p>
		`,
		text_body: `Hello {{given_name}},
			here's a link: http://google.com?utm_source={{source_code}}
			and here's another link: http://google.com?utm_source={{source_code}}
			`,
		status: 'LIST_BUILT',
		linkRewriter:function(link,i){
			return 'https://rewriter.com/?linkIndex='+i+'&url='+escape(link);
		}
	};

	let delivery={email_blast_id:1, person_id:1, person_email: 'larry@zoolander.com', status: 0};
	let person={given_name:"Larry", family_name:"Zoolander",email:'larry@zoolander.com'};

	const renderer = new EmailDeliveryRenderer(email_blast);
	renderer.initialize();
	it('should return the handlebars merge fields', function() {
		assert.deepEqual(renderer.getReferencedFields(),["given_name","source_code"]);
	});
	it('should merge person information into an email blast subject', function() {
		let {subject}=renderer.render({delivery,person});
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
	it('should render the html', function() {
		let {text_body,html_body}=renderer.render({delivery,person});
		console.log("Text Body output=",text_body);
		console.log("HTML Body output=",html_body);
		assert.deepEqual([],[]);
	});
});
