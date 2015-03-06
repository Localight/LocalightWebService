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
var credentials, user, giftcard;

/**
 * Giftcard routes tests
 */
describe('Giftcard CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Giftcard
		user.save(function() {
			giftcard = {
				amount: 1000,
				toUserUserName:'bob',
				districtNumber:'something',
			};
			done();
		});
	});

	it('should be able to save Giftcard instance if logged in', function(done) {
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
								if (giftcardsGetErr) done(giftcardsGetErr);

								// Get Giftcards list
								var giftcards = giftcardsGetRes.body;

								// Set assertions
								(giftcards[0].user._id).should.equal(userId);
								(giftcards[0].amount).should.match(1000);

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
	});
// the thing about this is that, we cover some of this in the model. we could make this a more general case, but still include it.
// i.e. in this method make sure all the informaiton is valid.
	it('should not be able to save Giftcard if no amount is provided', function(done) {
		giftcard.amount = '';
  	//giftcard.user = '';
  	giftcard.toUserUserName = 'something';
    giftcard.districtNumber = 'most something';

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
					.expect(400)
					.end(function(giftcardSaveErr, giftcardSaveRes) {
						// Set message assertion
						(giftcardSaveRes.body.message).should.match('Please enter an amount to purchase.');
						// Handle Giftcard save error
						done(giftcardSaveErr);
					});
			});
	});
	it('should not be able to save Giftcard if no toUserUserName is provided', function(done) {
		giftcard.amount = 1000;
  	//giftcard.user = '';
  	giftcard.toUserUserName = '';
    giftcard.districtNumber = 'most something';

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
					.expect(400)
					.end(function(giftcardSaveErr, giftcardSaveRes) {
						// Set message assertion
						(giftcardSaveRes.body.message).should.match('Please enter someone to send this too.');
						// Handle Giftcard save error
						done(giftcardSaveErr);
					});
			});
	});
	it('should not be able to save Giftcard if no districtNumber is provided', function(done) {
		giftcard.amount = 1000;
  	//giftcard.user = '';
  	giftcard.toUserUserName = 'asdfs';
    giftcard.districtNumber = '';

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
					.expect(400)
					.end(function(giftcardSaveErr, giftcardSaveRes) {
						// Set message assertion
						(giftcardSaveRes.body.message).should.match('Please enter a district number for this giftcard.');
						// Handle Giftcard save error
						done(giftcardSaveErr);
					});
			});
	});
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
								(giftcardUpdateRes.body._id).should.equal(giftcardSaveRes.body._id);
								(giftcardUpdateRes.body.amount).should.match(200);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Giftcards if not signed in', function(done) {
		// Create new Giftcard model instance
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

	it('should be able to get a single Giftcard if not signed in', function(done) {
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

	it('should not be able to delete Giftcard instance if not signed in', function(done) {
		// Set Giftcard user
		giftcard.user = user;

		// Create new Giftcard model instance
		var giftcardObj = new Giftcard(giftcard);

		// Save the Giftcard
		giftcardObj.save(function() {
			// Try deleting Giftcard
			request(app).delete('/giftcards/' + giftcardObj._id)
			.expect(401)
			.end(function(giftcardDeleteErr, giftcardDeleteRes) {
				// Set message assertion
				(giftcardDeleteRes.body.message).should.match('User is not logged in');

				// Handle Giftcard error error
				done(giftcardDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Giftcard.remove().exec();
		done();
	});
});
