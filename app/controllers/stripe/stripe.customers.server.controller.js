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
  exports.createACustomer = function(req, res){

     stripe.customers.create({
       email:req.user.email,
       metadata:{
          phoneNumber:req.user.username,
       },
       description:'this was created for the LocalightWebService',
    }).then(function handler(response){
       return response.id;
    }).catch(function errorHandler(errResponse){
       console.log(errResponse);
       return res.status(400).send({
          message: errorHandler.getErrorMessage(errResponse)
       });
    });
    
  };

 /**
  * Retrieve a Customer
  * Returns a customer object if a valid identifier was provided. When requesting the ID of a customer that has been deleted, a  * * subset of the customer's information will be returned, including a "deleted" property, which will be true.
  */
  exports.retreiveACustomer = function(req, res){

    stripe.customers.retrieve(req).then(function(response){
      return response;
      }).catch(function errHandler(err){
        return res.send(500, err);
    });
  };
 /*
  * Update Customer
  */
  exports.updateACustomer = function(req, res){
    stripe.customers.update(req).then(function(response){
      return response;
      }).catch(function errHandler(err){
        return res.send(500, err);
 });
  };
 /*
  * Delete a Customer
  */
  exports.deleteACustomer = function(req, res){
    stripe.customers.del(req).then(function(response){
      return response;
      }).catch(function errHandler(err){
        return res.send(500, err);
    });
  };

 /*
  * List all Customers
  */
  exports.listCustomers = function(req, res){
    stripe.customers.list(req.limit).then(function(response){
      return response;
      }).catch(function errHandler(err){
        return res.send(500, err);
    });
  };
 -->
