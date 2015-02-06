'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Merchant = mongoose.model('Merchant'),
	_ = require('lodash');
// I'm going to have to create a general class, that isn't merchant that describes this all better.
/**
 * Create a Merchant
 */
// createCustomer, and this is the customer controllers
exports.createMerchant = function(req, res) {

// var customer = new Customer(req.body);
	var merchant = new Merchant(req.body);
	var message = null;
	//customer.save(function(err){
	// if (err) {
	// 	return res.status(400).send({
	// 		message: errorHandler.getErrorMessage(err)
	// 	});
	// } else {
	// 	res.json(customer);
	// }
  //});
		merchant.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// This what we need if we want to log in a mercant or customer right after they sign up.
			// maybe to see their dashboard or something
			// // Remove sensitive data before login
			// user.password = undefined;
			// user.salt = undefined;
			// // req.login is a passport method, this creates the sessions or something.
			// // that's what this does.
			// req.login(user, function(err) {
			// 	if (err) {
			// 		res.status(400).send(err);
			// 	} else {
			// 		res.json(user);
			// 	}
			// });
			res.json(merchant);
		}
	});
};
/**
 * Show the current Merchant
 */
exports.read = function(req, res) {
	res.json(req.merchant);
};

/**
 * Update a Merchant
 */
exports.update = function(req, res) {
	var merchant = req.merchant ;

	merchant = _.extend(merchant , req.body);

	merchant.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(merchant);
		}
	});
};

/**
 * Delete an Merchant
 */
exports.delete = function(req, res) {
	var merchant = req.merchant ;

	merchant.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(merchant);
		}
	});
};

/**
 * List of Merchants
 */
exports.list = function(req, res) {
	Merchant.find().sort('-created').populate('user', 'displayName').exec(function(err, merchants) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(merchants);
		}
	});
};

/**
 * Merchant middleware
 */
exports.merchantByID = function(req, res, next, id) {
	Merchant.findById(id).populate('user', 'displayName').exec(function(err, merchant) {
		if (err) return next(err);
		if (! merchant) return next(new Error('Failed to load Merchant ' + id));
		req.merchant = merchant ;
		next();
	});
};

/**
 * Merchant authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.merchant.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
