'use strict';
/**
 * Module dependencies
 */

module.exports = function(app){
   var users = require('../../app/controllers/users.server.controller'),
   stripe = ('../../app/controllers/stripe.server.controller');
   /**
	 * @api{post} /user Request to Create Charge
	 * @apiName PostStripe
	 * @apiGroup Stripe
	 */

   app.route('/stripe/chargeACard').post()
   app.param('userId', users.userByID);
};
