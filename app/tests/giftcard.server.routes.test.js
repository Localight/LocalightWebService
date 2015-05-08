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
    // create a version of the object that will be sent to the server from the client side.
    // play around with all the different things that you could receive and plan
    // for what you don't see.
    //
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
      firstName: 'James',
      lastName: 'Hall',
      displayName: 'James Hall',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local',
			mobileNumber:1234567890,
      customerTokenThing: '/customers/CU36fiUpjSaB4fD0S1uA5EWY',
      cardTokenThing: '/cards/CC4GRkqY8x8uszvmEca6k9IX'
    });
    // recieves the giftcard.
    user2 = new User({
      firstName: 'Full2',
      lastName: 'Name2',
      displayName: 'Full2 Name2',
      email: 'test@test.com2',
			mobileNumber: 5456541234,
      username: credentials2.username,
      password: credentials2.password,
      provider: 'local'
    });
    // For now we are creating the user, in the future we will have the user created if they don't exist.
    user2.save();
    // Save a user to the test db and create new Giftcard
    user.save(function() {
      giftcard = {
        giftRecipientFirstName:'Full2 Name2',
        amount: 1234,
        mobileNumberOfRecipient: 5456541234,
				occasion: 'A gift for you!',
        //districtNumber: 'aDistrictNumber',
      };
      done();
    });
  });
  // Write this test so that it tests that user1, does not have any giftcards.
  // if he does that's wrong.

  // if the user signs out in the middle of a transaction we should probably handle that, currently nothing is setup.
  // TODO: invalidate transaction, if user gets signed out or something, if something bad happens delet the info.
  it('should not be able to save Giftcard instance if not logged in', function(done) {
    agent.post('/giftcards')
      .send(giftcard)
      .expect(401)
      .end(function(giftcardSaveErr, giftcardSaveRes) {
				(giftcardSaveRes.body.message).should.match('User is not logged in');
        // Call the assertion callback
        done(giftcardSaveErr);
      });
    // if a user can't post then a user can't update.
  });


  /*
   * Update tests.
   * if a user is signed in they should be able to update their gifcards, if they aren't logged in we should have the giftcards protected.
   */

  // never going to update a giftcard unless its for a refund or something
  // it('should be able to update Giftcard instance if signed in', function(done) {
  // 	agent.post('/auth/signin')
  // 		.send(credentials)
  // 		.expect(200)
  // 		.end(function(signinErr, signinRes) {
  // 			// Handle signin error
  // 			if (signinErr) done(signinErr);
  //
  // 			// Get the userId
  // 			var userId = user.id;
  //
  // 			// Save a new Giftcard
  // 			agent.post('/giftcards')
  // 				.send(giftcard)
  // 				.expect(200)
  // 				.end(function(giftcardSaveErr, giftcardSaveRes) {
  // 					// Handle Giftcard save error
  // 					if (giftcardSaveErr) done(giftcardSaveErr);
  //
  // 					// Update Giftcard name
  // 					giftcard.amount = 200;
  //
  // 					// Update existing Giftcard
  // 					agent.put('/giftcards/' + giftcardSaveRes.body._id)
  // 						.send(giftcard)
  // 						.expect(200)
  // 						.end(function(giftcardUpdateErr, giftcardUpdateRes) {
  // 							// Handle Giftcard update error
  // 							if (giftcardUpdateErr) done(giftcardUpdateErr);
  //
  // 							// Set assertions
  // 							(giftcardUpdateRes.body._id)
  // 							.should.equal(giftcardSaveRes.body._id);
  // 							(giftcardUpdateRes.body.amount).should.match(200);
  //
  // 							// Call the assertion callback
  // 							done();
  // 						});
  // 				});
  // 		});
  // });
  it('should not be able to get a list of Giftcards if not signed in', function(done) {
    // TODO: come back ands structure this.
    // Create new Giftcard model instance
    giftcard.user = user.id;
    var giftcardObj = new Giftcard(giftcard);
    // Save the Giftcard
		giftcardObj.save(function() {
			request(app).get('/giftcards/')
			.expect(401)
			.end(function(giftcardResponseErr, giftcardResponse) {
				(giftcardResponse.body.message).should.match('User is not logged in');
          done(giftcardResponseErr);
        });
    });
  });
  // it('should be able to get a list of Giftcards if signed in', function(done){
  // 	// Create a new Giftcard Model Instance
  // 	agent.post('/auth/signin')
  // 	.send(credentials2)
  // 	.expect(200)
  // 	.end(function(signinErr, signinREs){
  // 		// Handle signin error
  // 		if (signinErr) done(signinErr);
  //
  // 		// Get the userId2
  // 		var userId = user2.id;
  //
  // 		// save a new giftcard
  // 		agent.post('/giftcards')
  // 		.send(giftcard)
  // 		.expect(200)
  // 		.end(function(giftcardSaveErr, giftcardSaveRes){
  // 			// Handle giftcard article save error
  // 			if(giftcardSaveErr) done(giftcardSaveErr);
  //
  // 			// update
  // 		})
  //
  // 	})
  // 	var giftcardObj = new Giftcard(giftcard);
  //
  // 	//Save the giftcard
  // 	giftcardObj.save(function(){
  // 		// Request gifftcards
  // 		request(app).get('/giftcards')
  // 		.end(function(req, res){
  // 			// Set assertion
  // 			res.body.should.be.an.Array.with.lengthOf(1);
  // 			// Call the assertion callback
  // 			done():
  // 		});
  // 	});
  // });

  it('should not be able to get a single Giftcard if not signed in', function(done) {
    //TODO: If not signed in no giftcard for you!
    // come back and structure.
    // Create new Giftcard model instance
    var giftcardObj = new Giftcard(giftcard);
    // Save the Giftcard
    giftcardObj.save(function() {
			request(app).get('/giftcards/' + giftcardObj._id)
			.expect(401)
			.end(function(giftcardResponseErr, giftcardResponse) {

				(giftcardResponse.body.message).should.match('User is not logged in');

				done(giftcardResponseErr);
			});
    });
  });

  // Technically should not be able to delete giftcards.

  // it('should be able to delete Giftcard instance if signed in', function(done) {
  //   // when a giftcard is deleted it's actually spent.,
  //   // we need to elboarte the test to include that at some point
  //   agent.post('/auth/signin')
  //     .send(credentials)
  //     .expect(200)
  //     .end(function(signinErr, signinRes) {
  //       // Handle signin error
  //       if (signinErr) done(signinErr);
	//
  //       // Get the userId
  //       var userId = user.id;
	//
  //       // Save a new Giftcard
  //       agent.post('/giftcards')
  //         .send(giftcard)
  //         .expect(200)
  //         .end(function(giftcardSaveErr, giftcardSaveRes) {
  //           // Handle Giftcard save error
  //           if (giftcardSaveErr) done(giftcardSaveErr);
	//
  //           // Delete existing Giftcard
  //           agent.delete('/giftcards/' + giftcardSaveRes.body._id)
  //             .send(giftcard)
  //             .expect(200)
  //             .end(function(giftcardDeleteErr, giftcardDeleteRes) {
  //               // Handle Giftcard error error
  //               if (giftcardDeleteErr) done(giftcardDeleteErr);
	//
  //               // Set assertions
  //               (giftcardDeleteRes.body._id).should.equal(giftcardSaveRes.body._id);
	//
  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  /*
   * Test to send a giftcard to another user. What you need is a valid(existing) username, and a giftcard to send.
   *  essentially you should just be updating who the user property is in the existing giftcard class.
   */

  // it('should be able to change ownership of a Giftcard instance from userA to another userB if logged in, and charge first user', function(done) {
  //   // so how this should work, I am an exisint user, I create the giftcard, and then I send it to another user.
  //   // I could change it to just send it to another user and not have a save feature. We will get to that later.
  //   // I need to enter the name of an existing user, to send to.
  //   agent.post('/auth/signin')
  //     .send(credentials)
  //     .expect(200)
  //     .end(function(signinErr, signinRes) {
	//
  //       if (signinErr) done(signinErr);
  //       //Get the userId
  //       var userId2 = user2.id;
  //       // so the user is posting this informaiton to the database, the user
  //       // wants to save this information.
  //       // I just thought of an easy way to do this. I model the update obejct, and just update the
  //       // giftcard object, to reflect the new user.
  //       // 1.) search for userBs user object id.
  //       // 2.) take object id, and update the user object in property in the giftcard.
  //       // make this a direct update function. you change a specific peice of info but always update.
  //       // Save a new Giftcard
  //       agent.post('/giftcards')
  //         .send(giftcard)
  //         .expect(200)
  //         .end(function(giftcardSaveErr, giftcardSaveRes) {
  //           // Handle Giftcard save err
  //           if (giftcardSaveErr) done(giftcardSaveErr);
	//
  //           // Update User property of giftcard.
  //           //	giftcard.user = user2._id;
  //           // console.log('the current value of the user who owns the giftcard: '+ giftcard.user);
  //           // console.log('UserBs id' + user2._id);
  //           // now user doesn't have the giftcard in his collection anymore.
  //           // or at least that is the outcome we should get.
  //           // now the giftcard should appear under ownership of another user.
  //           // we should test to see that user does not have any giftcards.
  //           // then we should test that user2 does have a giftcard.
  //           // Get a list of Giftcards
  //           agent.put('/giftcards/' + giftcardSaveRes.body._id)
  //             .send(giftcard)
  //             .expect(200)
  //             .end(function(giftcardUpdateErr, giftcardUpdateRes) {
  //               // Handle Giftcard update error
  //               if (giftcardUpdateErr) done(giftcardUpdateErr);
	//
  //               // Set assertions
  //               // console.log(giftcard);
  //               // console.log(user);
  //               // console.log(user2);	(giftcardUpdateRes.body.mobileNumberOfRecipient).should.equal(5456541234);
  //               (giftcardUpdateRes.body.occasion).should.equal('A gift for you!');
	//
  //               (giftcardUpdateRes.body.toUserUserName).should.equal('username2');
	//
  //               (giftcardUpdateRes.body.districtNumber).should
  //                 .equal('aDistrictNumber');
  //               (giftcardUpdateRes.body.amount).should.match(1000);
  //               (giftcardUpdateRes.body._id).should.match(userId2);
	//
  //               // Call the assertion callback
  //               done();
  //             });
	//
  //         }); // save giftcard
  //     }); // end signin
  // }); // end should method
	// it('should be able to charge, send, and create a giftcard', function(done) {
  //   agent.post('/auth/signin')
  //     .send(credentials)
  //     .expect(200)
  //     .end(function(signinErr, signinRes) {
  //       // handle signin error
  //       if (signinErr) done(signinErr);
  //       //Get the userId
	// 			var userId = user.id;
  //       var userId2 = user2.id;
  //       // test teh create method now
  //       agent.post('/giftcards')
  //         .send(giftcard)
  //         .expect(200)
  //         .end(function(giftcardSaveErr, giftcardSaveRes) {
  //           // Handle Giftcard save err
  //           if (giftcardSaveErr) done(giftcardSaveErr);
  //           agent.get('/giftcards/' + giftcardSaveRes.body._id)
  //             .end(function(giftcardGetErr, giftcardGetRes) {
  //               // Handle Giftcard update error
  //               if (giftcardGetRes) done(giftcardGetRes);
  //               // Set assertions
  //               // console.log(giftcard);
  //               // console.log(user);
  //               // console.log(user2);	(giftcardUpdateRes.body.mobileNumberOfRecipient).should.equal(5456541234);
  //               (giftcardGetRes.body.occasion).should.equal('A gift for you!');
  //               (giftcardGetRes.body.mobileNumberOfRecipient).should.equal('5456541234');
  //               // (giftcardGetRes.body.districtNumber).should
  //               //   .equal('aDistrictNumber');
  //               (giftcardGetRes.body.amount).should.match(1234);
  //               (giftcardGetRes.body._id).should.match(userId2);
  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     }); // save giftcard
  // }); // end signin

  afterEach(function(done) {
    User.remove().exec();
    Giftcard.remove().exec();
    done();
  });
});
