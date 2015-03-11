'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Giftcard = mongoose.model('Giftcard'),
	balanced = require('balanced-official'),
	Q = require('q'),
	User = mongoose.model('User'),
	_ = require('lodash');
	balanced.configure('ak-test-243p045kOCxSDITqcndq40XGNK60zQ7Ft');
/**
 * Create a Giftcard
 */
// for sending the giftcard to another user, use update, but makde sure to accpet another parameter that
exports.create = function(req, res) {

	var giftcard = new Giftcard(req.body);
	// now that this works, I need to go through the tests and create method to update them with this logic.
	// I need to make it so a user can not create a giftcard for themselves.
	//console.log(giftcard);

	User.findOne({
		mobileNumber: giftcard.mobileNumberOfRecipient
	}).populate('user').exec(function(err, user) {
		// console.log('this is the value of the err'+err);
		// console.log('this is the value of the user'+user);
		if (err) {
			//console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			//TODO: this is where make the call to create the user if they don't exist.
		} else{
		//	console.log('this is the response from the user'+user);
			giftcard.user = user._id;
			giftcard.save(function(err){
				if(err){
				//	console.log(err);
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}else{
					res.jsonp(giftcard);
				}
			});
		}
	});
};


// exports.send = function(req, res){
// // I would like to have the search method put with the user, so it's modular.
//
// };
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
// Don't write new code, use the update and find methods to change ownder ship of the giftcard.
// the update and find methods work find.
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
	// hopefully this will only list the giftcards assoicated with this user.
	Giftcard.find({
		user: req.user.id
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
	Giftcard.findById(id).populate('user', 'displayName').exec(function(err, giftcard) {
		if (err) return next(err);
		if (!giftcard) return next(new Error('Failed to load Giftcard ' + id));
		req.giftcard = giftcard;
		next();
	});
};
// exports.giftcardByUserName = function(req, res, next, username) {
// 	Giftcard.giftcardByUserName(username).populate('user').exec(function(err, user) {
// 		if (err) return next(err);
// 		if (!user) return next(new Error('Failed to load Giftcard ' + user ));
// 		req.giftcard = user._id;
// 		next();
// 	});
// };

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
