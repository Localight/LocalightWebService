'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	//User = mongoose.model('User'),
	Merchant = mongoose.model('Merchant');

/**
 * Globals
 */
var merchant;
var merchant2;

/**
 * Unit tests
 */
describe('Merchant Model Unit Test:', function(){
	before(function(done){

		merchant = new Merchant({
			basicInfo:{
				ownerFirstName: 'Joe',
				ownerLastName: 'Smith',
				ownerPhoneNumber:1234567890,
				ownerEmailAddress:'something@gmail.com',
			},
			businessInfo:{
				legalCompanyName:'something'
			},
			bankPayoutInfo:{
				accountNumber:234235235,
				routingNumber:243253534,
			}
		});
		merchant2 = new Merchant({
			basicInfo:{
				ownerFirstName: 'Joe',
				ownerLastName: 'Smith',
				storeFrontName: 'store',
			}
		});
		done();
	});
	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			Merchant.find({}, function(err, merchants) {
				merchants.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			merchant.save(done);
		});

		// need to work on this one.
		//  it('should fail to save an existing user again', function(done) {
		//  	merchant.save();
		//  	return merchant2.save(function(err) {
		//  		should.exist(err);
		//  		done();
		//  	});
		//  });

		it('should be able to show an error when try to save without first name', function(done) {
			merchant.firstName = '';
			return merchant.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});
});
