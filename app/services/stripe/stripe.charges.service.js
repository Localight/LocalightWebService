'use strict';
var stripe = require('stripe')('sk_test_aczvTWoQ4G9GG9XNrHLvMEIj'),
errorHandler = require('./errors.server.controller'),
_ = require('lodash'),
Q = require('q'),
message = null;

/**
 * Create a Charges
 */
 exports.createACharge = function(req, res){

   stripe.charges.create({
     amount: req.amount,
     currency: 'usd',
     source: req.Token,
     }).then(function(response){
       return response.id;
     }).catch(function errHandler(err){
       return res.status(400).send({
         message: errorHandler.getErrorMessage(err)
     });
   });
 };

/**
 * Retrieve a Charges
 */

 exports.createACharge = function(req, res){
   stripe.charges.retrieve(req.token).then(function(response){
       return response;
     }).catch(function errHandler(err){
       return res.status(400).send({
         message: errorHandler.getErrorMessage(err)
     });
   });
 };
/*
 * Update Charges
 */
 // TODO: come back and figure out what we would update.
 exports.updateACharge = function(req, res){
   stripe.charges.update(req.token).then(function(response){
       return response;
     }).catch(function errHandler(err){
       return res.status(400).send({
         message: errorHandler.getErrorMessage(err)
     });
   });
 };
/*
 * Capture a Charges
 */
 exports.captureACharge = function(req, res){
   stripe.charges.caputre(req.token).then(function(response){
       return response;
     }).catch(function errHandler(err){
       return res.status(400).send({
         message: errorHandler.getErrorMessage(err)
     });
   });
 };

/*
 * List all Charges
 */
