'use strict';
var stripe = require('stripe')('sk_test_aczvTWoQ4G9GG9XNrHLvMEIj'),
// errorHandler = require('../controllers/errors.server.controller'),
_ = require('lodash'),
Q = require('q'),
message = null;

/**
 * Create a Transfer
 */
 exports.createATransfer = function(req, res){

   stripe.charges.create({
     amount: req.amount,
     currency: 'usd',
     recipient: req.Token,
     }).then(function(response){
       return response.id;
     }).catch(function errHandler(err){
       return res.send(500, err);
   });
 };
/**
 * Retrieve a Transfer
 */

/*
 * Update Transfer
 */

/*
 * Delete a Transfer
 */

/*
 * List all Transfer
 */
