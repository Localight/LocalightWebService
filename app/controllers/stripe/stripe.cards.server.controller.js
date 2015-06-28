<!-- 'use strict';
var config = require('../../../config/config'),
   stripe = require('stripe')(config.clientID, config.clientSecret),
   errorHandler = require('../errors.server.controller'),
   _ = require('lodash'),
   Q = require('q'),
   message = null;

/**
 * Create a Card
 * Creates a new customer object.
 */
exports.createACustomerToken = function(req, res) {
   stripe.customers.create().then(function(response) {
      return response.id;
   }).catch(function errHandler(err) {
      return res.send(500, err);
   });
};

/**
 * Retrieve a Card
 * Returns a customer object if a valid identifier was provided. When requesting the ID of a customer that has been deleted, a  * * subset of the customer's information will be returned, including a "deleted" property, which will be true.
 */
exports.retreiveACustomerObject = function(req, res)
{
   stripe.customers.retrieve(req).then(function(response) {
      return response;
   }).catch(function errHandler(err) {
      return res.send(500, err);
   });
};
/*
 * Update Card
 */
exports.updateACustomerObject = function(req, res)
{
   if (req.body.email !== ' ' || '' || null)
   {
      var holderEmail = req.body.email
   }
   if (req.body.description !== '' || ' ' || null)
   {
      var holderDescription = req.body.description,
   }
   //TODO: could come back later and add other fields.
   stripe.customers.update(req.user.customerToken,
      {
         email: holderEmail,
         description: holderDescription
         //TODO: list all the things you could update.
      }).then(function(response)
      {
         return response;
      }).catch(function errHandler(err)
      {
         return res.send(500, err);
      });
};
/*
 * Delete a Card
 */
exports.deleteACustomerObject = function(req, res)
{
   stripe.customers.del(req).then(function(response) {
      return response;
   }).catch(function errHandler(err) {
      return res.send(500, err);
   });
};

/*
 * List all Customers
 */
exports.listCustomerObjects = function(req, res) {
   stripe.customers.list(req.limit).then(function(response) {
      return response;
   }).catch(function errHandler(err) {
      return res.send(500, err);
   });
};
