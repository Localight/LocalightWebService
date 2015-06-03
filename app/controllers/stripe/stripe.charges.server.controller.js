// <!-- 'use strict';
//    var config = require('../../../../config/config'),
//       stripe = require('stripe')(config.clientID, config.clientSecret),
//       errorHandler = require('../../errors.server.controller'),
//       _ = require('lodash'),
//       Q = require('q'),
//       message = null;
//    /**
//     * Create a Charges
//     */
//    // add int the idempotent requests function.
//    // read docs and implement these https://stripe.com/docs#idempotent_requests
//    exports.createACharge = function(req, res) {
//       stripe.charges.create({
//          amount: req.body.amount,
//          currency: 'usd', // if we ever want to use differnet currency, the front just needs to reflect it.
//          //source: req.user.stripeCustomerToken,
//          //assuming the customer has a stripe card token assoicated to their account.
//          customer: req.user.stripeCustomerToken,
//          description: req.user.displayName + 'bought a giftcard worth' + req.body.amount
//       }).then(function handler(response) {
//          // after a charge is made, update subledger here.
//          console.log(response);
//          return response;
//       }).catch(function errorHandler(errResponse) {
//          return res.status(400).send({
//             message: errorHandler.getErrorMessage(errResponse)
//          });
//       });
//       // need to turn this into a promise
//    };
//
//    // /**
//    //  * Retrieve a Charges
//    //  */
//    //
//    //  exports.createACharge = function(req, res){
//    //
//    //    stripe.charges.retrieve(req.token).then(function(response){
//    //        return response;
//    //      }).catch(function errHandler(err){
//    //        return res.send(500, err);
//    //    });
//    //  };
//    /*
//     * Update Charges
//     */
//    // TODO: come back and figure out what we would update.
//    exports.updateACharge = function(req, res) {
//       stripe.charges.update(req.token).then(function(response) {
//          return response;
//       }).catch(function errHandler(err) {
//          return res.send(500, err);
//       });
//    };
//    /*
//     * Capture a Charges
//     */
//    exports.captureACharge = function(req, res) {
//       stripe.charges.caputre(req.token).then(function(response) {
//          return response;
//       }).catch(function errHandler(err) {
//          return res.send(500, err);
//       });
//    };
//
//    /*
//     * List all Charges
//     */
//  -->
