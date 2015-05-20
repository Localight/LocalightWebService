'use strict';
var errorHandler = require('./errors.server.controller'),
    config = require('../../config/config'),
    stripe = require('stripe')(config.clientID, config.clientSecret),
    message = null,
    Q = require('q');
/**
 *  This controller will take care of purchases
 */
 
 // stripe.customers.createCard(req.user.stripeCustomerToken, {
 //   card: req.user.stripeCardToken
 // }).then(function handler(response) {
 //   return stripe.charges.create({
 //     amount: giftcard.amount,
 //     source: response.id,
 //     customer: req.user.stripeCustomerToken,
 //     currency: 'usd',
 //     description: req.user.fullName +' bought a giftcard for ' + giftcard.giftRecipientFirstName
 //   });
 // }).then(function anotherHandler(response) {
 //   giftcard.stripeOrderId = response.id;
 //   giftcard.fromUser = req.user._id;
 //   return giftcard.save(function(err) {
 //     if (err) {
 //       return res.status(400).send({
 //         message: errorHandler.getErrorMessage(err)
 //       });
 //     } else {
 //       return res.json(giftcard);
 //     }
 //   });
 // }).catch(function errHandler(errorResponse) {
 //   return res.status(400).send({
 //     message: errorHandler.getErrorMessage(errorResponse)
 //   });
 // });
