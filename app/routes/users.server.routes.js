'use strict';

/**
 * Module dependencies.
 */
// BUILD THE MAILBOXES
module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users/accounts').delete(users.removeOAuthProvider);
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);
	app.route('/auth/twilioWebHook/').post(users.twilioWebHook);
	app.route('/auth/twilioWebHookLogin/:token').get(users.twilioWebHookLogin);
	app.route('/auth/signup').post(users.signup);// hum...
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);
	// Having stripe next to and embedded with the user class, allows us to use stripe where and when we
	// need it.
	// stripe accounts routes
	// TODO: Enter in routes for the stripe accounts API
	// stripe cards routes
	// TODO: Enter in routes for stripe cards API
	// stripe customers routes
	// TODO: Enter in Routes for Stripe Customers API
	// stripe transfer routes
	// TODO: Enter in Routes for Stripe Transfer API
	// stripe refund routes
	// TODO: Enter in Routes for Stripe Refunds API
	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
