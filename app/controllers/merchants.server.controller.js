'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	balanced = require('balanced-official'),
	Merchant = mongoose.model('Merchant'),
	Q = require('q'),
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
exports.signupMerchant = function(req, res) {
//	balanced.configure('ak-test-243p045kOCxSDITqcndq40XGNK60zQ7Ft');

// var customer = new Customer(req.body);
	var merchant = new Merchant(req.body);
	var message = null;

	// save like normal.

	// even save the payload.
	var payload = {
		email: merchant.contactInfo.email_address,
		name: merchant.contactInfo.first_name + ' ' + merchant.contactInfo.last_name,
		business_name: merchant.businessInfo.business_name,
		phone: merchant.contactInfo.phone
	};
	// with this approach we get a promised object.
	var promise = balanced.marketplace.customers.create(payload);
	promise.then(function(err, response){
		if (err) {
			return res.status(500).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(promise);
			merchant.balancedStuff.customerToken = JSON.stringify(promise);
			merchant.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					// once everything reaches this point the program doesn't have to send the merchant obeject back.
					// In fact the program shouldn't. Not until the merchant has a dashboard. and this is turned into
					// redirects to a login feature.
					res.json(merchant);//if i want to send back the saved object, I could do res.json(merchant);
					// this sends back the merchant object.
				}
			});
	}
 });

	// Q.fcall(balanced.marketplace.customers.create(payload)).then().


//
// 	console.log(JSON.stringify(balanced.marketplace.customers.create({
//     'address': {
//         'postal_code': '48120'
//     },
//     'name': 'Henry Ford',
//     'dob_year': 1963,
//     'dob_month': 7
// })));
// //	var promise = balanced.marketplace.customers.create(payload);
// console.log(JSON.stringify(balanced.marketplace.customers.create(payload, function (err, response) {
// 		if(err) {
// 			// handle error
// 			return res.status(500).send({
// 				message: errorHandler.getErrorMessage(err)
// 			});
// 		} else {
// 			// consider creating not a controller but a service..
// 			// in this else branch, we have a good response from bp.
// 			// now we can access the token and save the merchant.
// 			// and also respond to the user request
// 		merchant.balancedInfo.customerToken = response.body.customers.href;
//
// 			// now starts the second wrapped callback, save to mongo
//
// 		}//end else of balanced.market.place
// 	})));
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
