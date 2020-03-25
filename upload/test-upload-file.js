const [upload_uri,filename]=process.argv.slice(2);
if(!upload_uri||!filename) throw new Error('');

const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
form.append('upload_file', fs.createReadStream(filename));

axios.create({
	headers: form.getHeaders()
}).post(upload_uri, form).then(response => {
	console.log(response);
}).catch(error => {
	if (error.response) {
		console.log(error.response);
	}
	console.log(error.message);
});
