'use strict';
var balanced = require('../../app/controllers/balanced.server.controller'),
    users = require('../../app/controllers/users.server.controller');
/**
 * Module dependencies.
 */
 module.exports = function(app){
   // balanced api routes
   app.route('/tokenizeCard')
   .post(balanced.tokenizeCard);
   app.route('/chargeCard')
   .post(balanced.chargeCard);

   // setting up balanced api routes.
   app.route('/tokenizeCustomer').post(balanced.tokenize_user_into_customer);
   // does this need any parameters?
};
