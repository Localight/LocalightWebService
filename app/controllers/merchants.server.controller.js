'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Merchant = mongoose.model('Merchant'),
	Q = require('q'),
	_ = require('lodash');


/**
 * Take a Merchant and turn them into a customer.
 */
exports.createCustomer = function(req, res) {
	var merchant = new Merchant(req.body);
	merchant.user = req.user;

	var payload = {
		name: merchant.name,
		business_name: merchant.business_name,
		ein: merchant.ein,
		email: merchant.email,
		phone_number: merchant.phoneNumber,
	};
	balanced.marketplace.customers.create(payload).then(function handler(response){
		merchant.balancedStuff.customerTokenThing = response.href;
		return merchant.save();
	}).then(function anotherHandler(response){
		res.jsonp(merchant);
	}).catch(function errHandler(err){
		console.log('This error came from trying to create a customer' + err);
		return res.status(400).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};
/**
 * Take givens data and turn it into bank account token, possibly assoicate it in the same step
 */
exports.createBankAccount = function(req, res){
	var merchant = req.merchant;
	merchant = _.extend(merchant , req.body);
	console.log('got here');
	var payload = {
		name: merchant.name,
		account_type: 'checking',
		account_number:merchant.accountNumber,
		routing_number:merchant.routingNumber,
	};
	console.log(payload);
	merchant.accountNumber = '';// clear out the account number from the merchant before you save it.
	balanced.marketplace.bank_accounts.create(payload).then(function handler(response){
		console.log(JSON.stringify(response));
		merchant.balancedStuff.bankAccountTokenThing = response.href;
		balanced.get(merchant.balancedStuff.bankAccountTokenThing).associate_to_customer(merchant.balancedStuff.customerTokenThing);
		return balanced.get(merchant.balancedStuff.bankAccountTokenThing).verify();
	}).then(function yetAnotherHanlder(response){
		merchant.balancedStuff.bankAcountConfirmationTokenThing = response.href;
		return merchant.save();
	}).catch(function errHandler(err){
		console.log('this error was sent from the createbankaccount method:' + err);
		return res.status(400).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * Attempt to confirm the bank account with the two random variables.
 * We will have to add the a check for the two random values.
 * I mean I don't know how to handle the random chances of which values belongs to wich
 */
exports.validateBankAccount = function(req, res){
	// balanced.get(merchant.balancedStuff.bankAccountConfirmationTokenThing).confirm(randomValueOne, randomValuetwo)
	// .then(function handler(response){
	// 	merchant.balancedStuff.verificationStatus = response.verification_status;
	//
	// }).then
	//TODO: come back to and finish the confimiration sequence.
};


/**
 * Show the current Merchant
 */
exports.read = function(req, res) {
	res.jsonp(req.merchant);
};

/**
 * Update a Merchant
 */
exports.update = function(req, res) {
	var merchant = req.merchant;

	merchant = _.extend(merchant , req.body);

	merchant.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(merchant);
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
			res.jsonp(merchant);
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
			res.jsonp(merchants);
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
