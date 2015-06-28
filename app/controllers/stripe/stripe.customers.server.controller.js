<!-- 'use strict';
// the only purpose of this service is to modularize the stuff we need stripe to do in the backend.
// keep everything for stripe in here, and call
var config = require('../../../config/config'),
stripe = require('stripe')(config.clientID, config.clientSecret),
 errorHandler = require('../errors.server.controller'),
_ = require('lodash'),
Q = require('q'),
message = null;
 /**
  * Create a Customer
  * Creates a new customer object.
  */
  exports.createACustomerObject = function(req, res){

    stripe.customers.create({
      userId : req.user.id,
      mobileNumber : req.user.username,
      email: req.user.email,
      }).then(function(response){
        return response.id;
      }).catch(function errHandler(err){
        return res.send(500, err);
    });
  };

 /**
  * Retrieve a Customer
  * Returns a customer object if a valid identifier was provided. When requesting the ID of a customer that has been deleted, a  * * subset of the customer's information will be returned, including a "deleted" property, which will be true.
  */
  exports.retreiveACustomerObject = function(req, res){

    stripe.customers.retrieve(req).then(function(response){
      return response;
      }).catch(function errHandler(err){
        return res.send(500, err);
    });
  };
 /*
  * Update Customer
  */
  exports.updateACustomerObject = function(req, res){
    stripe.customers.update(req).then(function(response){
      return response;
      }).catch(function errHandler(err){
        return res.send(500, err);
 });
  };
 /*
  * Delete a Customer
  */
  exports.deleteACustomerObject = function(req, res){
    stripe.customers.del(req).then(function(response){
      return response;
      }).catch(function errHandler(err){
        return res.send(500, err);
    });
  };

 /*
  * List all Customers
  */
  exports.listCustomerObjects = function(req, res){
    stripe.customers.list(req.limit).then(function(response){
      return response;
      }).catch(function errHandler(err){
        return res.send(500, err);
    });
  };
 -->
