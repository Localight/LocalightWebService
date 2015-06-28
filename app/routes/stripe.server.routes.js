'use strict';
module.exports = function(app) {
   var users = require('../../app/controllers/users.server.controller'),
      stripe = require('../../app/controllers/stripe.server.controller');

      app.route('stripe/createACharge')
         .get(users.requiresLogin, stripe.createACharge);


         app.param('userId', users.userByID);
};
