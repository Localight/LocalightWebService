// 'use strict';
//
// /**
//  * Module dependencies.
//  */
// var should = require('should'),
// 	mongoose = require('mongoose'),
// 	User = mongoose.model('User'),
// 	Merchant = mongoose.model('Merchant');
//
// /**
//  * Globals
//  */
// var user, merchant;
//
// /**
//  * Unit tests
//  */
// describe('Merchant Model Unit Tests:', function() {
// 	beforeEach(function(done) {
// 		user = new User({
// 			firstName: 'Full',
// 			lastName: 'Name',
// 			displayName: 'Full Name',
// 			email: 'test@test.com',
// 			username: 'username',
// 			password: 'password'
// 		});
//
// 		user.save(function() {
// 			merchant = new Merchant({
// 				// Add model fields
// 				// ...
// 			});
//
// 			done();
// 		});
// 	});
//
// 	describe('Method Save', function() {
// 		it('should be able to save without problems', function(done) {
// 			return merchant.save(function(err) {
// 				should.not.exist(err);
// 				done();
// 			});
// 		});
// 	});
//
// 	afterEach(function(done) {
// 		Merchant.remove().exec();
// 		User.remove().exec();
//
// 		done();
// 	});
// });
