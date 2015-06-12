 'use strict';
/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend stripe controller
 */
module.exports = _.extend(
	  require('./stripe/stripe.charges.server.controller')
   //  require('./stripe/stripe.accounts.server.controller'),
   //  require('./stripe/stripe.cards.server.controller'),
   //  require('./stripe.customers.server.controller'),
   //  require('./stripe.refund.server.controller'),
   //  require('.stripe.transfer.server.controller');
);
