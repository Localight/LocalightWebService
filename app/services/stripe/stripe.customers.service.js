'use strict';
// the only purpose of this service is to modularize the stuff we need stripe to do in the backend.
// keep everything for stripe in here, and call
var stripe = require('stripe')('sk_test_aczvTWoQ4G9GG9XNrHLvMEIj'),
errorHandler = require('./errors.server.controller'),
Q = require('q');

/*
 *     ************ Customers  ***********
 */

 /*
  *  Create Customers
  */

exports.createCustomer = function(data){
  var q = Q.defer();
  stripe.customers.create({
    userId : data._id,
    mobileNumber : data.mobileNumber
    }).then(function(response){
      return response.id;
    }).catch(function errHandler(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
    });
  });
};

 /*
  *  Retrieve Customers
  */

 /*
  *  Update Customers
  */

 /*
  *  Delete a Customers
  */

 /*
  * List all customers
  */

 /*
  *    ******* CARDS ***********
  */

 /*
  * Create A Card
  */
