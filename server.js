'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

	/**
	* services
	*/
	// var twilioService = require('./app/services/twilio-service'),
	// 		mailerService = require('./app/services/mailgun-service'),
		//var	balancedController = require('./app/controllers/balancedpayments.server.controller');
			// subledgerService = require('./app/services/subledger-service');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// In general I'm not sure how the boilerplate code gets configured, and this is how it was done in the other
// project so this is how i'm going to try it.

// Initialize Modules ************

//twilioService.init(config.twilio.acctSid, config.twilio.authToken); // Twilio

//mailerService.init(config.mailgun); // Mailgun

//balancedController.init(config.balancedPayments); // Balanced Payments

//subledgerService.init(config.subledger.key, config.subledger.secret, config.subledger.org_id, config.subledger.book_id, config.subledger.depositor_category_id, config.subledger.uncleared_category_id, config.subledger.balance_sheet_id); // Subledger

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
