'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
   errorHandler = require('./errors.server.controller'),
   config = require('../../config/config'),
   Giftcard = mongoose.model('Giftcard'),
   User = mongoose.model('User'),
   _ = require('lodash'),
   stripe = require('stripe')(config.clientID, config.clientSecret),
   message = null,
   Q = require('q');

/**
 * This should create a giftcard, and also send out signals to the other services. The goal is to buy the end of this method have a giftcard created.
 * This will involved stripe, and subledger.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
 exports.create = function(req, res) {
   // if a user isn't found create one, otherwise find the user and save the giftcard.
   var giftcard = new Giftcard(req.body);

   // assign the toUser before when you get it from the other method.
   // check to make sure user has a stripe credit card token and customer token.
   // if they don't have both then throw an error like a little bitch.

   stripe.customers.createCard(req.user.stripeCustomerToken, {
     card: req.user.stripeCardToken
   }).then(function handler(response) {
     return stripe.charges.create({
       amount: giftcard.amount,
       source: response.id,
       customer: req.user.stripeCustomerToken,
       currency: 'usd',
       description: req.user.fullName +' bought a giftcard for ' + giftcard.giftRecipientFirstName
     });
   }).then(function anotherHandler(response) {
     giftcard.stripeOrderId = response.id;
     giftcard.fromUser = req.user._id;
     return giftcard.save(function(err) {
       if (err) {
         return res.status(400).send({
           message: errorHandler.getErrorMessage(err)
         });
       } else {
         return res.json(giftcard);
       }
     });
   }).catch(function errHandler(errorResponse) {
     return res.status(400).send({
       message: errorHandler.getErrorMessage(errorResponse)
     });
   });
 };
/**
 * Show the current Giftcard
 */
exports.read = function(req, res) {
   res.jsonp(req.giftcard);
};
// Don't write new code, use the update and find methods to change ownder ship of the giftcard.
// the update and find methods work find.
/**
 * [spend, this method will decrement a giftcard. it will not allow a giftcard to go below a negative number and when it has reached zero, a flag will be changed on the model.]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.spend = function(req, res) {

};
/**
 * SpendAGiftcard will subtract an amount from the giftcard.
 *
 * @param {[type]} req [description]
 * @param {[type]} res [description]
 */
exports.spendAGiftcard = function(req, res) {
   // I need two things, a value and a merchantId
   // Spend a giftcard. similar to update only it checks the amount and does other things.
   // Make the call the subledger before saving the value.
   //
};
/**
 * Update a Giftcard
 */
exports.update = function(req, res) {
   // should only decrement the amount of a giftcard.
   // first check the value coming in against the value of the giftcard. if to greater than the size of the giftcard send back an error.
   // first check to see if this giftcard is zeroed out.
   // other wise, change the value of the card, and update subledger.
   // if the card zero's out then change the zeroedOutFlag in the model to true.
   // that way this giftcard can't get used.
   //
   // I know what merchant you are using the giftcard at so I just want to pay you out,
   // or pay you out minus what we keep.
   //
   var giftcard = req.giftcard;

   giftcard = _.extend(giftcard, req.body);
   // might not need to create a transaction object, instead, since we are just updating the value of the object.
   //
   // every time the giftcard is updated create a transaction to reflect the change.
   giftcard.save(function(err) {
      if (err) {
         return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
         });
      } else {
         res.jsonp(giftcard);
      }
   });
   //TODO: come back and more too, not sure what to do with this data.
};

/**
 * Delete an Giftcard
 */
exports.delete = function(req, res) {
   var giftcard = req.giftcard;
   // The method gets called after the merchant enters the tricon and the amount has been transfered to him.
   // this is the final step to completing a transaction.
   // pay-out vendor create invoice,
   // delete giftcard
   // email vendor
   giftcard.remove(function(err) {
      if (err) {
         return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
         });
      } else {
         res.jsonp(giftcard);
      }
   });
};

/**
 * List of Giftcards
 */
exports.list = function(req, res) {
   // hopefully this will only list the giftcards assoicated with this user.
   Giftcard.find({
      toUser: req.user.id
   }).populate('user', 'displayName').exec(function(err, giftcards) {
      if (err) {
         return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
         });
      } else {
         res.jsonp(giftcards);
      }
   });
};
/**
 * Giftcard middleware
 */
exports.giftcardByID = function(req, res, next, id) {
   Giftcard.findById(id).populate('user').exec(function(err, giftcard) {
      if (err) return next(err);
      if (!giftcard) return next(new Error('Failed to load Giftcard ' + id));
      req.giftcard = giftcard;
      next();
   });
};

/**
 * Giftcard authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
   if (req.giftcard.user.id !== req.user.id) {
      return res.status(403).send({
         message: 'User is not authorized'
      });
   }
   next();
};
