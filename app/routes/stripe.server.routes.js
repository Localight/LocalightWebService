'use strict';
/**
 * Module dependencies.
 */

module.exports = function(app) {
	// Stripe Routes
	var stripe = require('../../app/controllers/stripe.server.controller');

   // Stripe charges api connections
   app.route('/stripe/charge').get(stripe.createACharge);
	//need to find out if i need a parameter or not.
};
