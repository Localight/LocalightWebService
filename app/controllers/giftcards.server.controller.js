'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  // userCtrl = require(''),
  Giftcard = mongoose.model('Giftcard'),
  User = mongoose.model('User'),
  Transaction = mongoose.model('Transaction'),
  // nodemailer = require('nodemailer'),
  _ = require('lodash'),
  Q = require('q'),
  stripe = require('stripe')('sk_test_GvAql6HE34rlYwDR3FLSjaHt'),
  message = null;

/**
 * Create a Giftcard
 */
// for sending the giftcard to another user, use update, but makde sure to accpet another parameter that
// all the giftcard should do is save it's self. don't make it work to hard.
exports.create = function(req, res) {
  // if a user isn't found create one, otherwise find the user and save the giftcard.
  var giftcard = new Giftcard(req.body);
  console.log(giftcard);
  console.log(req.user.stripeCustomerToken);
  // assign the toUser before when you get it from the other method.
  console.log(giftcard.stripeCardToken);
  stripe.customers.createCard(req.user.stripeCustomerToken, {
    card: giftcard.stripeCardToken
  }).then(function handler(response) {
    console.log('response from linking card and customer' + JSON.stringify(response));
    return stripe.charges.create({
      amount: giftcard.amount,
      source: response.id,
      customer: req.user.stripeCustomerToken,
      currency: 'usd',
      description: req.user.fullName +' bought a giftcard for ' + giftcard.giftRecipientFirstName
    });
  }).then(function anotherHandler(response) {
    console.log('response from charging card' + JSON.stringify(response));
    giftcard.stripeOrderId = response.id;
    giftcard.fromUser = req.user._id;
    return giftcard.save(function(err) {
      console.log(err);
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        return res.json(giftcard);
      }
    });
  }).catch(function errHandler(errorResponse) {
    console.log('got an error: ', errorResponse);
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
 * Update a Giftcard
 */
exports.update = function(req, res) {
	var giftcard = req.giftcard;

	giftcard = _.extend(giftcard , req.body);
  // might not need to create a transaction object, instead, since we are just updating the value of the object.
  // 
  // every time the giftcard is updated create a transaction to reflect the change.
  var transaction = new Transaction();
  transaction.orderId = req.giftcard.orderId;
  transaction.giftcardId = req.giftcard._id;
  transaction.netAmount = req.giftcard.amount;//might need to turn this in a number or something not sure yet.
  transaction.merchantId = req.giftcard.merchant;
  transaction.recipientId = req.giftcard.toUser;
  transaction.senderId = req.giftcard.fromUser;

  //TODO: come back and more too, not sure what to do with this data.
  transaction.save(function(err){
    if (err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else{

      giftcard.save(function(err) {
    		if (err) {
    			return res.status(400).send({
    				message: errorHandler.getErrorMessage(err)
    			});
    		} else {
    			res.jsonp(giftcard);
    		}
    	});
    }
  });
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
