'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Giftcard = mongoose.model('Giftcard'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, credentials2, user, user2, giftcard;

/**
 * Giftcard routes tests
 * What does  a giftcard do?
 * Giftcards are purcahased and spent.
 * A giftcard can never be owned by the user who created it.
 * A giftcard must be sent to another user. If one exists, then attach, else create that user.
 * To keep things modular, the giftcard does not handle the creation of the user, it merely checks the databse
 * for the one it is looking for. Idealy, the user portion of this should be contained in the user controller.
 * I want to keep things modular.
 */
describe('Giftcard CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};
		credentials2 = {
			username: 'username2',
			password: 'password2'
		};

		// Create a new user

		// user creates the giftcard and sends it to his friend.
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});
		// recieves the giftcard.
		user2 = new User({
			firstName: 'Full2',
			lastName: 'Name2',
			displayName: 'Full2 Name2',
			email: 'test@test.com2',
			mobileNumberOfRecipient:5456541234,
			username: credentials2.username,
			password: credentials2.password,
			provider: 'local'
		});
		// For now we are creating the user, in the future we will have the user created if they don't exist.
		user2.save();
		// Save a user to the test db and create new Giftcard
		user.save(function() {
			giftcard = {
				giftRecipientName:'your friends name here',
				amount: 1000,
				mobileNumberOfRecipient:5456541234,
				message: 'A gift for you!',
				districtNumber:'aDistrictNumber',
			};

			done();
		});
	});

	it('should not be able to save Giftcard instances that it created if logged in', function(done) {

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) { // Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Giftcard
				agent.post('/giftcards')
					.send(giftcard)
					.expect(200)
					.end(function(giftcardSaveErr, giftcardSaveRes) {
						// Handle Giftcard save error
						if (giftcardSaveErr) done(giftcardSaveErr);

						// Get a list of Giftcards
						agent.get('/giftcards')
							.end(function(giftcardsGetErr, giftcardsGetRes) {
								// Handle Giftcard save error
								// TODO: figure out how to test for null case,
								// I want to make sure that this user has no giftcards.
								if (giftcardsGetErr) done(giftcardsGetErr);

								// Get Giftcards list
								var giftcards = giftcardsGetRes.body;

								// Set assertions
								(giftcards[0].user._id).should.equal(null);
								(giftcards[0].amount).should.match(null);

								// Call the assertion callback
								done();
							});
					});
			});
	});
// if the user signs out in the middle of a transaction we should probably handle that, currently nothing is setup.
// TODO: invalidate transaction, if user gets signed out or something, if something bad happens delet the info.
	it('should not be able to save Giftcard instance if not logged in', function(done) {
		agent.post('/giftcards')
			.send(giftcard)
			.expect(401)
			.end(function(giftcardSaveErr, giftcardSaveRes) {
				// Call the assertion callback
				done(giftcardSaveErr);
			});
			// if a user can't post then a user can't update.
	});
// the thing about this is that, we cover some of this in the model. we could make this a more general case, but still include it.
// i.e. in this method make sure all the informaiton is valid.

	/*
	 * Update tests.
	 * if a user is signed in they should be able to update their gifcards, if they aren't logged in we should have the giftcards protected.
		 */
	it('should be able to update Giftcard instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Giftcard
				agent.post('/giftcards')
					.send(giftcard)
					.expect(200)
					.end(function(giftcardSaveErr, giftcardSaveRes) {
						// Handle Giftcard save error
						if (giftcardSaveErr) done(giftcardSaveErr);

						// Update Giftcard name
						giftcard.amount = 200;

						// Update existing Giftcard
						agent.put('/giftcards/' + giftcardSaveRes.body._id)
							.send(giftcard)
							.expect(200)
							.end(function(giftcardUpdateErr, giftcardUpdateRes) {
								// Handle Giftcard update error
								if (giftcardUpdateErr) done(giftcardUpdateErr);

								// Set assertions
								(giftcardUpdateRes.body._id)
								.should.equal(giftcardSaveRes.body._id);
								(giftcardUpdateRes.body.amount).should.match(200);

								// Call the assertion callback
								done();
							});
					});
			});
	});
	it('should not be able to get a list of Giftcards if not signed in', function(done) {
		// TODO: come back ands structure this.
		// Create new Giftcard model instance
		giftcard.user = user.id;
		var giftcardObj = new Giftcard(giftcard);
		// Save the Giftcard
		giftcardObj.save(function() {
			// Request Giftcards
			request(app).get('/giftcards')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should not be able to get a single Giftcard if not signed in', function(done) {
		//TODO: If not signed in no giftcard for you!
		// come back and structure.
		// Create new Giftcard model instance
		var giftcardObj = new Giftcard(giftcard);

		// Save the Giftcard
		giftcardObj.save(function() {
			request(app).get('/giftcards/' + giftcardObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('amount', giftcard.amount);
					// res.body.should.be.an.Object.with.property('cardToken', giftcard.cardToken);
					// res.body.should.be.an.Object.with.property('message', giftcard.message);
					res.body.should.be.an.Object.with.property('toUserUserName', giftcard.toUserUserName);
					res.body.should.be.an.Object.with.property('districtNumber', giftcard.districtNumber);
					// res.body.should.be.an.Object.with.property('user', giftcard.user);
					// res.body.should.be.an.Object.with.property('toUserUserName', giftcard.toUserUserName);
					// res.body.should.be.an.Object.with.property('toUserUserName', giftcard.toUserUserName);
					// Call the assertion callback
					done();
				});
		});
	});
	// Technically should not be able to delete giftcards.
	it('should be able to delete Giftcard instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Giftcard
				agent.post('/giftcards')
					.send(giftcard)
					.expect(200)
					.end(function(giftcardSaveErr, giftcardSaveRes) {
						// Handle Giftcard save error
						if (giftcardSaveErr) done(giftcardSaveErr);

						// Delete existing Giftcard
						agent.delete('/giftcards/' + giftcardSaveRes.body._id)
							.send(giftcard)
							.expect(200)
							.end(function(giftcardDeleteErr, giftcardDeleteRes) {
								// Handle Giftcard error error
								if (giftcardDeleteErr) done(giftcardDeleteErr);

								// Set assertions
								(giftcardDeleteRes.body._id).should.equal(giftcardSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	/*
	 * Test to send a giftcard to another user. What you need is a valid(existing) username, and a giftcard to send.
	 *  essentially you should just be updating who the user property is in the existing giftcard class.
	 */
	it('should be able to update ownership of a Giftcard instance from userA to another userB if logged in', function(done){
		// so how this should work, I am an exisint user, I create the giftcard, and then I send it to another user.
		// I could change it to just send it to another user and not have a save feature. We will get to that later.
		// I need to enter the name of an existing user, to send to.
		agent.post('/auth/signin')
		.send(credentials)
		.expect(200)
		.end(function(signinErr, signinRes){
			if (signinErr) done (signinErr);
			//Get the userId
			var userId2 = user2.id;
			// so the user is posting this informaiton to the database, the user
			// wants to save this information.
			// I just thought of an easy way to do this. I model the update obejct, and just update the
			// giftcard object, to reflect the new user.
			// 1.) search for userBs user object id.
			// 2.) take object id, and update the user object in property in the giftcard.
			// make this a direct update function. you change a specific peice of info but always update.
			// Save a new Giftcard
			agent.post('/giftcards')
				.send(giftcard)
				.expect(200)
				.end(function(giftcardSaveErr, giftcardSaveRes) {
					// Handle Giftcard save err
					if (giftcardSaveErr) done(giftcardSaveErr);

					// Update User property of giftcard.
				//	giftcard.user = user2._id;
					// console.log('the current value of the user who owns the giftcard: '+ giftcard.user);
					// console.log('UserBs id' + user2._id);
					// now user doesn't have the giftcard in his collection anymore.
					// or at least that is the outcome we should get.
					// now the giftcard should appear under ownership of another user.
					// we should test to see that user does not have any giftcards.
					// then we should test that user2 does have a giftcard.
					// Get a list of Giftcards
					agent.put('/giftcards/' + giftcardSaveRes.body._id)
						.send(giftcard)
						.expect(200)
						.end(function(giftcardUpdateErr, giftcardUpdateRes) {
							// Handle Giftcard update error
							if (giftcardUpdateErr) done(giftcardUpdateErr);

							// Set assertions
							// console.log(giftcard);
							// console.log(user);
							// console.log(user2);	(giftcardUpdateRes.body.mobileNumberOfRecipient).should.equal(5456541234);
							(giftcardUpdateRes.body.message).should.equal('A gift for you!');

							(giftcardUpdateRes.body.toUserUserName).should.equal('username2');

							(giftcardUpdateRes.body.districtNumber).should
							.equal('aDistrictNumber');
			   		(giftcardUpdateRes.body.amount).should.match(1000);
							(giftcardUpdateRes.body._id).should.match(userId2);

							// Call the assertion callback
							done();
						});

				});// save giftcard


		});// end signin
	});// end should method

	afterEach(function(done) {
		User.remove().exec();
		Giftcard.remove().exec();
		done();
	});
});
