'use strict';
var stripe = require('stripe')('sk_test_aczvTWoQ4G9GG9XNrHLvMEIj'),
errorHandler = require('../errorService'),
_ = require('lodash'),
Q = require('q'),
message = null;

/**
 * Create a Charges
 */
 exports.createACharge = function(payload) {
   console.log('contents of payload'+JSON.stringify(payload));
   var dfd = Q.defer();
   dfd.resolve(
     stripe.charges.create({
       amount: payload.amount,
       currency: 'usd',
       source: payload.source,
       customer: payload.customer,
       description:'put stuff here.'
      //  card: payload.stripeCardToken
       }));
   return dfd.promise;
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
 exports.updateACharge = function(req, res){
   stripe.charges.update(req.token).then(function(response){
       return response;
     }).catch(function errHandler(err){
       return res.send(500, err);
   });
 };
/*
 * Capture a Charges
 */
 exports.captureACharge = function(req, res){
   stripe.charges.caputre(req.token).then(function(response){
       return response;
     }).catch(function errHandler(err){
       return res.send(500, err);
   });
 };

/*
 * List all Charges
 */
