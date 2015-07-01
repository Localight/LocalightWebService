 'use strict';
   var config = require('../../../config/config'),
      stripe = require('stripe')(config.clientID, config.clientSecret),
      errorHandler = require('../errors.server.controller'),
      _ = require('lodash'),
      Q = require('q'),
      message = null;
   /**
    * Create a Charges
    */
   // add int the idempotent requests function.
   // read docs and implement these https://stripe.com/docs#idempotent_requests
exports.createACharge = function(req, res) {
      // if the body does not contain an amount, stripe will send back and error.
      stripe.charges.create({
         amount: req.body.amount,
         currency: 'usd', // if we ever want to use differnet currency, the front just needs to reflect it.
         //source: req.user.stripeCustomerToken,
         //assuming the customer has a stripe card token assoicated to their account.
         customer: req.user.stripeCustomerToken,// if no stripe token is avaible, stripe will return an error.
         description: req.user.displayName + 'bought a giftcard worth' + req.body.amount
      }).then(function handler(response) {
         // make a call to subledger here, using the sgit cubleger-service. make sure you are calling the post that,
         // updates the updates subledger.
         // If something goes wrong with stripe, then don't update subleger, read the response from stripe and
         // check for faliure or success, on a success create a post to subledger. if not success don't do anything,
         // and return the response to the user.
         console.log(response);
         return response;
      }).catch(function errorHandler(errResponse) {
         return res.status(400).send({
            message: errorHandler.getErrorMessage(errResponse)
         });
      });
      // need to turn this into a promise
   };

   // /**
   //  * Retrieve a Charges
   //  */
   //
   //  exports.createACharge = function(req, res){
   //
   //    stripe.charges.retrieve(req.token).then(function(response){
   //        return response;
   //      }).catch(function errHandler(err){
   //        return res.send(500, err);
   //    });
   //  };
   /*
    * Update Charges
    */
   // TODO: come back and figure out what we would update.
   exports.updateACharge = function(req, res) {
      stripe.charges.update(req.token).then(function(response) {
         return response;
      }).catch(function errHandler(err) {
         return res.send(500, err);
      });
   };
   /*
    * Capture a Charges
    */
   exports.captureACharge = function(req, res) {
      stripe.charges.caputre(req.token).then(function(response) {
         return response;
      }).catch(function errHandler(err) {
         return res.send(500, err);
      });
   };

   /*
    * List all Charges
    */
