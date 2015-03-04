'use strict';

/**
 * Module dependencies.
 */
 module.exports = function(app){
   // balanced api routes
   var balanced = require('../../app/controllers/balanced.server.controller');

   // setting up balanced api routes.
   app.route('/tokenizeCustomer').post(balanced.tokenize_user_into_customer);

};
