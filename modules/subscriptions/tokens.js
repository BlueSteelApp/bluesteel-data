const {v4:uuid}=require('uuid');
const crypto=require('crypto');

const {BLUESTEEL_UNSUBSCRIBE_TOKEN_KEY}=process.env;
if(!BLUESTEEL_UNSUBSCRIBE_TOKEN_KEY) {
	console.log('no BLUESTEEL_UNSUBSCRIBE_TOKEN_KEY set - unsubscribe tokens will not be maintained through shutdown');
}
const tokenKey = BLUESTEEL_UNSUBSCRIBE_TOKEN_KEY || uuid();

module.exports = {
	getTokenForPersonEmail: function(id) {
		const raw = JSON.stringify({id});
		const cipher = crypto.createCipher('aes256', tokenKey);
		const token = cipher.update(raw, 'utf8', 'hex') + cipher.final('hex');
		return token;
	},
	getPersonEmailFromToken: function(token) {
		const decipher = crypto.createDecipher('aes256', tokenKey);
		const decrypted = decipher.update(token, 'hex', 'utf8') + decipher.final('utf8');
		return JSON.parse(decrypted);
	}
};
