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
 * These tests enusre that the giftcard is saved properly, and if it has any methods that it excutes those corretly.
 *
 */
// Fix {} thing
describe('Giftcard Model Unit Tests:', function() {
	// WHAT AM I TESTING?
	// I am testing the unit of the giftcard class object and all the things it could be doing.
	beforeEach(function(done) {
		// THE SETUP
		// 1. create a fake user to use that simulates an actualy user.
		// 2. create a fake giftcard for them to pass around,

		user = new User({
			// create what you need to make a bare minumn user.
			firstName: 'Sebastion',
			lastName: 'Ultron',
			displayName: 'Sebastion Ultron',
			email: 'test@tester.com',//TODO: use an actual email address for this user.
			username: 'testUser',
			password: 'password'
		});
		// TODO: giftcard mobile number should not match the mobile number of the user.
		user.save(function() {
			giftcard = new Giftcard({
				giftRecipientFirstName:'Allen',
				amount: 1000,
				mobileNumberOfRecipient:5456541234,// make sure it's someone else.
				message: 'A gift for you!',
				//districtNumber:'aDistrictNumber',
				user: user
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
		it('should be able to show an error when trying to save withouth a Mobile Number entered.', function(done){
			giftcard.mobileNumberOfRecipient = '';
			return giftcard.save(function(err){
				should.exist(err);
				done();
			});
		});
		// TODO: expand this to make sure only the correct number of interegers is saved as well 9-digits
		it('should show an error when ever anyting other than intergers have been added into the mobile number', function(done){
			giftcard.mobileNumberOfRecipient = 'asdf';
			return giftcard.save(function(err){
				should.exist(err);
				done();
				});
			});


	it('should show an error when ever anyting other than intergers have been added into the amounts', function(done){
		giftcard.amount = 'asdf';

		return giftcard.save(function(err){
			should.exist(err);
			done();
			});
		});
	});
	//TODO: add the other things in like the district number.
	//TODO:
	//TODO: write tests to make sure giftcard model is returning correct statements on save of object.
	//TODO: make sure you have two different conditions for each test one that pass
	// and one that fails, but passes.
	// write a test for each validations condition, and make sure you have a
	// negative and postive test. 
// 		it('should show an error when ever try to save without district number', function(done){
// 			giftcard.toUserUserName = 'bob';
// 			giftcard.amount = 12;
// 			giftcard.districtNumber = '';
// 			return giftcard.save(function(err){
// 				should.exist(err);
// 				done();
// 			});
// 	});

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
