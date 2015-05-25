'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/findOrCreateUser').post(users.findOrCreateUser);// might want to make sure only logged in users can do this later.
	// TODO: make sure only logged in users can do this.
	app.route('/auth/signup').post(users.signup);// hum...
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// stripe charges routes
	app.route('/stripe/charge').post(users.createACharge);
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
