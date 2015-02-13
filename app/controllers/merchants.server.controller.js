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

//TODO: make sure the errors work correctly.
// attempting to call balanced and tokenize customer.
// the tokenize bank account info
// delete sensitive info from merchant model.
// connect bank account to customer.
// save merchant without sensitive info to database.
// this just receives the merchant response.
// createCustomer, and this is the customer controllers
//might want to change this up.
exports.signupMerchant = function(req, res) {

	var merchant = new Merchant(req.body);
	console.log('this is the status of teh merchant' + merchant);
	var message = null;
	// save like normal.
	// even save the payload.
	var payload = {
		routing_number: merchant.routing_number,
		account_number: merchant.account_number,
		acccount_type: 'checking',
		name: merchant.first_name + ' ' + merchant.last_name,
	};
	console.log(JSON.stringify(payload));
	// take care of the senstive bank info first. If anything goes wrong, we never have the
	// bank info for to long.
	var promise = balanced.marketplace.bank_account.create(payload);

	console.log(JSON.stringify(promise));
	promise.then(function callback(response, err) {
		console.log(response);
		console.log(err);
		if (err) {
					return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}else{
				merchant.accountToken = response._href;// got the bank token
				merchant.routing_number =' ';
				merchant.account_number =' ';
			}
	});


	var payload2 = {
		email: merchant.email_address,
		name: merchant.first_name + ' ' + merchant.last_name,
		phone: merchant.phone,
		business_name: merchant.business_name,
		line1: merchant.address.line1,
		line2: merchant.address.line2,
		state: merchant.address.state,
		postal_code: merchant.address.zipcode
	};
	console.log(JSON.stringify(payload2));
	var promise2 = balanced.marketplace.customers.create(payload2);
	console.log(JSON.stringify(promise2));
	promise2.then(function something(response){
		console.log('from promise 2'+ JSON.Stringify(response));
		merchant.customerToken = response.body._href;// got the customer token
		// come back to the part below this.
		balanced.get(merchant.bank_account.accountToken).associate_to_customer(merchant.customerToken);
		merchant.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				return res.json(merchant);
			}
		});

		// I could put this in another promise and do something with what is returned,
		// but I'm going to see if I can just send it off and not care what happens about it.
		// I guesss I would need to know about an error though.

		// alrigth this isn't very stable, because I don't have any condition protections, for the peron,
		// doesn't enter bank info. Altough I could stop that by not letting the program contiune if the fornt
		// end forms haven't been filled in.
		// this is all designed on the premise that the user is only goign to use this once. If a user wants to
		// update or fix his bank info, it's not setup like that.
		//TODO: enter button in front end for checkings or savings.
		//
	}, function (err){
		console.log(err);
		// need help understanding how to handle errors
		return res.status(500).send({
			message: errorHandler.getErrorMessage(err)
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
