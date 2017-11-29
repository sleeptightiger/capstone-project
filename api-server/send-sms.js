var accountSid = 'AC7782ffd4a30554db5bc90f3d8bed34ae'; // Your Account SID from www.twilio.com/console
var authToken = 'a88626e023e437511d6a9b629cbc1957';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Did it work?',
    to: '+19568730660',  // Text this number
    from: '+19564652112' // From a valid Twilio number
})
.then((message) => console.log(message.sid));
