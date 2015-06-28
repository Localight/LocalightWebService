'use strict';
module.exports = function(app) {
   var users = require('../../app/controllers/users.server.controller'),
      stripe = require('../../app/controllers/stripe.server.controller');

      app.route('stripe/createACharge')
         .get(users.requiresLogin, stripe.createACharge);
      app.route('stripe/createACustomerToken')
         .post(users.requiresLogin, stripe.createACustomerToken);
      // not sure how to write the update route. not sure if I should write it liek.
      // stripe/retreiveACustomerObject:id, or just make it another post.
      // I don't know what this is going to be called in the application.
      // for now i'm going to leave it out.
            
   app.param('userId', users.userByID);
};
