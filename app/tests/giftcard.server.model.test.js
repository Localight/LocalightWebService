'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Giftcard = mongoose.model('Giftcard');

/**
 * Globals
 */
var user, giftcard;

/**
 * Unit tests
 */
describe('Giftcard Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			giftcard = new Giftcard({
				amount: 10000,
				user: user,// the user that purchases the gift card holds it until they send it.
				toUserUserName:'bob', // for now this doesn't do anying.
				districtNumber:'something',
				// In a few hours it will use the string entered to looj for a user with the same matching string.
				// in actuaality. the gift card is bought by one user and sent to another user.
				// in the production app, the user will assign a user for the giftcard to be saved too.
				// when the user enters in a phone number the server will locatte or create a user with the person name given,
				// then thse user will assign this gift card to that person.
			});
			done();
		});
	});

	describe('Method Save', function() {
		// when it saves should be able to save with out probelems it means, that the obejct is created, with alll the requirments,
		// specified in the objects model schema. i.e, all the require functions are valid and the informaiton made it to the database.
		// this is the base case that everyhthing works.
		it('should be able to save without problems', function(done) {
			return giftcard.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
		// the most crucial thing is that every giftcard has an amount.
		it('should be able to show an error when try to save without an amount', function(done) {
			giftcard.amount = '';

			return giftcard.save(function(err) {
				should.exist(err);
				done();
			});
		});
		it('should be able to show an error when trying to save withouth a UserUserName entered.', function(done){
			giftcard.toUserUserName = '';
			return giftcard.save(function(err){
				should.exist(err);
				done();
			});
		});
		it('should be able to show an error when trying to save without a UserUserName and a amount.', function(done){
			giftcard.toUserUserName = '';
			giftcard.amount = '';
			return giftcard.save(function(err){
				should.exist(err);
				done();
			});
		});
	it('should show an error when ever anyting other than intergers have been added into the amounts', function(done){
		giftcard.toUserUserName = '';
		giftcard.amount = 'asdf';
		return giftcard.save(function(err){
			should.exist(err);
			done();
			});
		});
	});
// 		it('should show an error when ever try to save without district number', function(done){
// 			giftcard.toUserUserName = 'bob';
// 			giftcard.amount = 12;
// 			giftcard.districtNumber = '';
// 			return giftcard.save(function(err){
// 				should.exist(err);
// 				done();
// 			});
// 	});
// 	it('should show an error when you try to save and you a merchant hasnt been recorded. and or an invalid one has been entered.', function(done){
// 		giftcard.districtNumber = '';
// 		giftcard.toUserUserName = 'bob';
// 		giftcard.amount = '';
// 	});
// });
//

// so this is what we need to test so that the backend controller does everyting it's suppose.
// first we make sure the model is saving correctly, and that the requirements are all set.
// next, we make sure amount is always correct.
// search the database for a userB, that contains the unquie phone number.
// remeber we are assuming that no one can have the same phone number, later we might ad somehting else.
// for tesitng pupose we are only searching for username.
// if a username can found with that username string, then we send owner of the gift card to that person.
// we want to pass the giftcard object around a few users, to make sure that works.
// after that we want to make sure gift card gets deleted correctly. technically a user can't delte a gift card only the admin can.
// the gift card is just an amount that gets passed around. it's the amount that the vendor will get paid. or the value of the purchased gift card.
	afterEach(function(done) {
		Giftcard.remove().exec();
		User.remove().exec();

		done();
	});
});
