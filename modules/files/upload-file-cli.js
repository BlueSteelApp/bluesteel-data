let [filename, upload_uri]=process.argv.slice(2);
if(!filename) throw new Error('');

upload_uri = upload_uri || 'http://localhost:5000/upload';

const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
form.append('upload_file', fs.createReadStream(filename));

axios.create({
	headers: form.getHeaders()
}).post(upload_uri, form).then(response => {
	console.log(response.data);
}).catch(error => {
	if (error.response) {
		console.log(error.response);
	}
	console.log(error.message);
});
