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
// I think you test the logic of the controller in here.
// not the logic of the models, lets assume our models are finsihed and correct.
describe('Merchant Model Unit Test:', function(){
	// firs create some merchants to test out stuff on.
	before(function(done){
		merchant = new Merchant({
		//	created: '',
			ownerContactInfo:{
				ownerFirstName:'Joe',
				ownerLastName:'Smith',
				ownerPhoneNumber:1234567890,
				ownerEmailAddress:'something@gmail.com',
			},
			businessInfo:{
				legalCompanyName:'Sheningans',
				businessBillingAddress:{
					street:'99 inifinity loop',
					city:'Long Beach',
					state:'CA',
					zipcode:'1234556'
				},
				companyWebsite:'www.something.com',
				storeFrontName:'poop'
			},
			bankPayoutInfo:{
				accountNumber:234235235,
				routingNumber:243253534,
			}
		}).
		merchant2 = new Merchant({
		//	created: '',
			ownerContactInfo:{
				ownerFirstName: 'Joe',
				ownerLastName: 'Smith',
				ownerPhoneNumber:1234567890,
				ownerEmailAddress:'something@gmail.com',
			},
			businessInfo:{
				businessBillingAddress:{
					street:'99 inifinity loop',
					city:'Long Beach',
					state:'CA',
					zipcode:'1234556'
				},
				companyWebsite:'www.something.com',
				storeFrontName:'poop'
			},
			bankPayoutInfo:{
				accountNumber:234235235,
				routingNumber:243253534,
			}
		});
		done();
	});// end before'
	describe('Method Save', function(){
		it('should begin with no users', function(done){
			Merchant.find({}, function(err, merchants) {
				merchants.should.have.length(0);
				done();
			});
		});
		it('should be able to save without problem without validations, i.e, ran without require', function(done){
			merchant.save(done);
		});

		it('should be able to show an error when try to save without first name', function(done){
			merchant.ownerContactInfo.ownerFirstName='';
			return merchant.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without last name', function(done){
			merchant.ownerContactInfo.ownerLastName='';
			return merchant.save(function(err) {
				should.exist(err);
				done();
			});
		});
		it('should be able to show an error when try to save without phone number', function(done){
			merchant.ownerContactInfo.ownerPhoneNumber='';
			return merchant.save(function(err) {
				should.exist(err);
				done();
			});
		});
		it('should be able to show an error when try to save without email address', function(done){
			merchant.ownerContactInfo.ownerEmailAddress='';
			return merchant.save(function(err) {
				should.exist(err);
				done();
			});
		});
		// add in test for saving banking info.
	});
	after(function(done) {
	 		Merchant.remove().exec();
	 		done();
	 	});
});// end describe merchant model unit test
