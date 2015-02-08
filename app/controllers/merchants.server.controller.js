'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	balanced = require('balanced-official'),
	Merchant = mongoose.model('Merchant'),
	_ = require('lodash');
	balanced.configure('ak-test-243p045kOCxSDITqcndq40XGNK60zQ7Ft');
// I'm going to have to create a general class, that isn't merchant that describes this all better.
/**
 * Create a Merchant
 */
exports.init = function(apiKey){
	balanced.configure(apiKey);
};

// createCustomer, and this is the customer controllers
exports.createMerchant = function(req, res) {

// var customer = new Customer(req.body);
	var merchant = new Merchant(req.body);
	var message = null;

	var payload = {
		email: merchant.contactInfo.email_address,
		name: merchant.contactInfo.first_name + ' ' + merchant.contactInfo.last_name,
		business_name: merchant.contactInfo.business_name,
		phone: merchant.contactInfo.phone
	};
	 balanced.marketplace.customers.create(payload, function(response){
		if(response.status !== 201){
			alert(response.error.description);
			return;
			}else{
				console.log(response.body.href);
			}
		     merchant.balancedStuff.customerToken = response.body.customers.uri;
			   merchant.save(function(err) {
		     if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(merchant);
				}
			});
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
