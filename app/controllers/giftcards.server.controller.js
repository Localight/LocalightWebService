'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Giftcard = mongoose.model('Giftcard'),
	balanced = require('balanced-official'),
	Q = require('q'),
	_ = require('lodash');
	balanced.configure('ak-test-243p045kOCxSDITqcndq40XGNK60zQ7Ft');
/**
 * Create a Giftcard
 */
exports.create = function(req, res) {
	var giftcard = new Giftcard(req.body);
	// putting the charge in here temp
	giftcard.user = req.user;// why we don't assign the user in the test.
	// part of the test was just give it any value and have it save it to the database.

	giftcard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(giftcard);
		}
	});
};

		// creating a temporary giftcard to test things.
	// var payload = {
	// 	expiration_month:08,
	// 	expiration_year:2018,
	// 	number:4111111111111111,
	// 	card_brand:'VISA',
	// 	card_type: 'Credit',
	// 	cvv:'123',
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

/**
 * Update a Giftcard
 */
exports.update = function(req, res) {
	var giftcard = req.giftcard;

	giftcard = _.extend(giftcard , req.body);

	giftcard.save(function(err) {
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
 * Delete an Giftcard
 */
exports.delete = function(req, res) {
	var giftcard = req.giftcard ;

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
	Giftcard.find().sort('-created').populate('user', 'displayName').exec(function(err, giftcards) {
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
	Giftcard.findById(id).populate('user', 'displayName').exec(function(err, giftcard) {
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
