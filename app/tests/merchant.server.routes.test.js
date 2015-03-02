'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Merchant = mongoose.model('Merchant'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, merchant;

/**
 * Merchant routes tests
 */
describe('Merchant CRUD tests', function() {
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

		// Save a user to the test db and create new Merchant
		user.save(function() {
			merchant = {
				name: 'Merchant Name'
			};

			done();
		});
	});

	it('should be able to save Merchant instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Merchant
				agent.post('/merchants')
					.send(merchant)
					.expect(200)
					.end(function(merchantSaveErr, merchantSaveRes) {
						// Handle Merchant save error
						if (merchantSaveErr) done(merchantSaveErr);

						// Get a list of Merchants
						agent.get('/merchants')
							.end(function(merchantsGetErr, merchantsGetRes) {
								// Handle Merchant save error
								if (merchantsGetErr) done(merchantsGetErr);

								// Get Merchants list
								var merchants = merchantsGetRes.body;

								// Set assertions
								(merchants[0].user._id).should.equal(userId);
								(merchants[0].name).should.match('Merchant Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Merchant instance if not logged in', function(done) {
		agent.post('/merchants')
			.send(merchant)
			.expect(401)
			.end(function(merchantSaveErr, merchantSaveRes) {
				// Call the assertion callback
				done(merchantSaveErr);
			});
	});

	it('should not be able to save Merchant instance if no name is provided', function(done) {
		// Invalidate name field
		merchant.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Merchant
				agent.post('/merchants')
					.send(merchant)
					.expect(400)
					.end(function(merchantSaveErr, merchantSaveRes) {
						// Set message assertion
						(merchantSaveRes.body.message).should.match('Please fill Merchant name');
						
						// Handle Merchant save error
						done(merchantSaveErr);
					});
			});
	});

	it('should be able to update Merchant instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Merchant
				agent.post('/merchants')
					.send(merchant)
					.expect(200)
					.end(function(merchantSaveErr, merchantSaveRes) {
						// Handle Merchant save error
						if (merchantSaveErr) done(merchantSaveErr);

						// Update Merchant name
						merchant.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Merchant
						agent.put('/merchants/' + merchantSaveRes.body._id)
							.send(merchant)
							.expect(200)
							.end(function(merchantUpdateErr, merchantUpdateRes) {
								// Handle Merchant update error
								if (merchantUpdateErr) done(merchantUpdateErr);

								// Set assertions
								(merchantUpdateRes.body._id).should.equal(merchantSaveRes.body._id);
								(merchantUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Merchants if not signed in', function(done) {
		// Create new Merchant model instance
		var merchantObj = new Merchant(merchant);

		// Save the Merchant
		merchantObj.save(function() {
			// Request Merchants
			request(app).get('/merchants')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Merchant if not signed in', function(done) {
		// Create new Merchant model instance
		var merchantObj = new Merchant(merchant);

		// Save the Merchant
		merchantObj.save(function() {
			request(app).get('/merchants/' + merchantObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', merchant.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Merchant instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Merchant
				agent.post('/merchants')
					.send(merchant)
					.expect(200)
					.end(function(merchantSaveErr, merchantSaveRes) {
						// Handle Merchant save error
						if (merchantSaveErr) done(merchantSaveErr);

						// Delete existing Merchant
						agent.delete('/merchants/' + merchantSaveRes.body._id)
							.send(merchant)
							.expect(200)
							.end(function(merchantDeleteErr, merchantDeleteRes) {
								// Handle Merchant error error
								if (merchantDeleteErr) done(merchantDeleteErr);

								// Set assertions
								(merchantDeleteRes.body._id).should.equal(merchantSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Merchant instance if not signed in', function(done) {
		// Set Merchant user 
		merchant.user = user;

		// Create new Merchant model instance
		var merchantObj = new Merchant(merchant);

		// Save the Merchant
		merchantObj.save(function() {
			// Try deleting Merchant
			request(app).delete('/merchants/' + merchantObj._id)
			.expect(401)
			.end(function(merchantDeleteErr, merchantDeleteRes) {
				// Set message assertion
				(merchantDeleteRes.body.message).should.match('User is not logged in');

				// Handle Merchant error error
				done(merchantDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Merchant.remove().exec();
		done();
	});
});