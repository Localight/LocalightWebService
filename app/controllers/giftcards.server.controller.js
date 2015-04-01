'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  // userCtrl = require(''),
  Giftcard = mongoose.model('Giftcard'),
  User = mongoose.model('User'),
  Mailgun = require('mailgun-js'),
  _ = require('lodash'),
  stripe = require('stripe')('sk_test_aczvTWoQ4G9GG9XNrHLvMEIj'),
  // stripeChargesService = require('../services/stripe/stripe.charges.service'),
  message = null;
  var api_key = 'key-8972c0fdf717238d1f3cf94cb8e48b80';
  var domain = 'https://api.mailgun.net/v3/sandbox428c48a0bb81470fa274a3dd60e05d8d.mailgun.org';
  var theMailGun = new Mailgun({apiKey:api_key, domain:domain});
var recipietEmail = {
  from: 'noreply@localism.co',
  to: '',
  subject: 'Clique Card',
  html:' '
};
/**
 * Create a Giftcard
 */
// for sending the giftcard to another user, use update, but makde sure to accpet another parameter that
// all the giftcard should do is save it's self. don't make it work to hard.
exports.create = function(req, res) {
  console.log('got here too');
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
      description: 'put something here'
    });
  }).then(function handler(response) {
    console.log('response from charging card' + JSON.stringify(response));
    giftcard.stripeOrderId = response.id;
    giftcard.fromUser = req.user._id;
    recipietEmail.to = req.user.email;
    // recipietEmail.title = 'Localism Email';
    recipietEmail.subject = 'Your Clique GiftCard Purchase.';
    recipietEmail.html = 'Here is the recipeit for your giftcard purchase.';
    console.log('the contents of the email'+ recipietEmail);
    theMailGun.messages().send(recipietEmail, function(err, body) {
      if (err) {
        console.log('got an error: ', err);
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.send('Recipiet on its way');
        console.log(body);
      }
    });

    return giftcard.save(function(err) {
      console.log(err);
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        return res.json(giftcard);
      }
    }); // returns status of charge.
  });

  // stripe.charges.create(payload).then(function handler(response){
  //
  // 	giftcard.orderTokenThing = response.id;
  // 	// emailing the recipet and saving the giftcard can happen at the same time.
  // 	return giftcard.save();
  // 	// email recipiet,
  // 	//
  // }).then(function anotherHandler(response){
  // 	res.jsonp(giftcard);
  // }).catch(function errHandler(err){
  // 	return res.status(400).send({
  // 		message: errHandler.getErrorMessage(err)
  // 	});
  // });

  // send email to user indicating that they created a giftcard.
};
// };
// creating a temporary giftcard to test things.
// var payload = {
// 	expiration_month:08,
// 	expiration_year:2018,
// 	number:4111111111111111,
// 	card_brand:'VISA',
// 	card_type: 'Credit',
// 	cvc:'123',
// };

// for now save the token to the giftcard
// 	balanced.marketplace.cards.creat(payload).then(function handler(response){
// 		giftcard.cardToken = response.href;
// 		return giftcard.save();
// 	}).then(function anotherHandler(response){
// 		res.jsonp(giftcard);
// 	}).catch(function errHandler(err){
// 		console.log('This error came from trying to create a customer' + err);
// 		return res.status(400).send({
// 			message: errorHandler.getErrorMessage(err)
// 			});
// 		});
// };

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
// exports.update = function(req, res) {
// 	var giftcard = req.giftcard;
//
// 	giftcard = _.extend(giftcard , req.body);
//
// 	giftcard.save(function(err) {
// 		if (err) {
// 			return res.status(400).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else {
// 			res.jsonp(giftcard);
// 		}
// 	});
// };

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
