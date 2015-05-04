'use strict';
/**
 * Module dependencies.
 */
module.exports = function(app) {
	// Routing logic
	// ...
	var twilio = require('../../app/controllers/twilio.server.controller');
	// setting up the incoming routes from twilio.
	//
	app.route('/sms/pingFromTwilio')
		.post(twilio.interceptTwilioMesage); //http://lbgift.com/sms/pingFromTwilio
};
