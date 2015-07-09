<!-- 'use strict';
var config = require('../../../config/config'),
stripe = require('stripe')(config.clientID, config.clientSecret),
 errorHandler = require('../errors.server.controller'),
_ = require('lodash'),
Q = require('q'),
message = null;
/**
 * Create a refund
 */
exports.createARefund = function(req, res){
   ({

   }).then(function handler(resopnse){

   }).catch(function errorHandler(errResponse){
      console.log(errResponse);
      return res.status(400).send({
         message: errorHandler.getErrorMessage(errResponse)
      });
   });
};
/**
 * Retrieve a refund
 */
exports.retreiveARefund = function(req, res){
   ({

   }).then(function handler(resopnse){

   }).catch(function errorHandler(errResponse){
      console.log(errResponse);
      return res.status(400).send({
         message: errorHandler.getErrorMessage(errResponse)
      });
   });
};
/*
 * Update refund
 */
exports.updateARefund = function(req, res){
   ({

   }).then(function handler(resopnse){

   }).catch(function errorHandler(errResponse){
      console.log(errResponse);
      return res.status(400).send({
         message: errorHandler.getErrorMessage(errResponse)
      });
   });
};
/*
 * List all refund
 */
exports.listAllRefunds = function(req, res){
   ({

   }).then(function handler(resopnse){

   }).catch(function errorHandler(errResponse){
      console.log(errResponse);
      return res.status(400).send({
         message: errorHandler.getErrorMessage(errResponse)
      });
   });
};
