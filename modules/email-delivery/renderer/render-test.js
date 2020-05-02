const assert=require('assert');
const EmailDeliveryRenderer = require('./');

describe('email render wrapper', function() {
	let email_blast={
		id: 1,
		message_set_id: 1,
		subject: 'Hello {{given_name}}',
		from_name: 'test-from-name',
		from_email: 'test-from@bluesteelcrm.com',
		html_body: `
			Hello {{given_name}},
			<p>Here's a link <a href="http://google.com?utm_source={{source_code}}">to google</a></p>
			<p>Here's another link <a href="http://google.com?utm_source={{source_code}}">to google</a></p>
		`,
		text_body: `Hello {{given_name}},
			here's a link http://google.com?utm_source={{source_code}}
			http://google.com?utm_source={{source_code}}
			`,
		status: 'LIST_BUILT'
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
});
