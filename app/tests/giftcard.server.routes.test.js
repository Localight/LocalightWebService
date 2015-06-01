// <!-- 'use strict';
//
// var should = require('should'),
//    request = require('supertest'),
//    app = require('../../server'),
//    mongoose = require('mongoose'),
//    User = mongoose.model('User'),
//    Giftcard = mongoose.model('Giftcard'),
//    agent = request.agent(app); // this is allows us to persist and save cookies
// // agent is basically creating a simulation of a our app.
//
// /**
//  * Globals
//  */
// var credentials, credentials2, user1, user2, giftcard;
//
// /**
//  * Giftcard routes tests
//  * What does  a giftcard do?
//  * Giftcards are purcahased and spent.
//  * A giftcard can never be owned by the user1 who created it.
//  * A giftcard must be sent to another user1. If one exists, then attach, else create that user1.
//  * To keep things modular, the giftcard does not handle the creation of the user1, it merely checks the databse
//  * for the one it is looking for. Idealy, the user1 portion of this should be contained in the user1 controller.
//  * I want to keep things modular.
//  */
// describe('Giftcard CRUD tests', function() {
//    // Setup Global Variables
//    beforeEach(function(done) {
//       // Create some user1 credintials
//       credentials = {
//          username: 'username', // we dont need them to be phone numbers in this instance
//          password: 'password'
//       };
//       credentials2 = {
//          username: 'username2', // we dont need them to be phone numbers in this instance
//          password: 'password2'
//       };
//       // Create a new User
//       /**
//        * This will simulate the user1 who is sending the giftcard to another user1.
//        * @type {User}
//        */
//
//       user1 = new User({
//          firstName: 'Billy',
//          lastName: 'Bob',
//          displayName: 'Billy Bob',
//          email: 'test@test.com', // need to find an actual email that I can simulate.
//          username: credentials.username,
//          password: credentials.password,
//          provider: 'local',
//          stripeCustomerToken: 'cus_6F4IWktgFqPHj3',
//          stripeCardToken:{
//             primary:'card_162aBuBNPqu3SRN2d2hCYAKD'
//          },
//       });
//       user1.save();
//       /**
//        * This user1 will simulate the user1 who uses the giftcard.
//        * @type {User}
//        */
//       user2 = new User({
//          firstName: 'Nathan',
//          lastName: 'Drake',
//          displayName: 'Nathan Drake',
//          email: 'test@test.com',
//          username: credentials2.username,
//          password: credentials2.password,
//          provider: 'local',
//       });
//       user2.save();
//       giftcard = new Giftcard({
//          amount: 2000,
//          spenderofgiftcard: user2,
//          purchaserofgiftcard: user1,
//          stripeOrderId: 'some number',
//       });
//       done();
//    });
//    // I need to test that a giftcard can't be saved under the same user1..
//    it('user1 should be able to save the giftcard AND view it under a different user1', function(done) {
//       // need to post it under one user1 and view under another.
//       // it should not apear in the same users list.
//       // The first user1 should, after creating the giftcard have // no giftcards.
//       // 1. Create the giftcard under one user1 and then,
//       // 2. view the giftcard under a different user1.
//       agent.post('/api/authsignin')
//          .send(credentials)
//          .expect(200)
//          .end(function(signinErr, signinRes) {
//             // Handle signin error
//             if (signinErr) done(signinErr);
//
//             // // Get the userId
//             var userId = user1.id;
//             var userId2 = user2.id;
//
//             // Save a new giftcard
//             agent.post('/api/giftcards')
//                .send(giftcard)
//                .expect(200)
//                .end(function(giftcardSaveErr, giftcardSaveRes) {
//
//                   // Handle giftcard save error
//                   if (giftcardSaveErr) done(giftcardSaveErr);
//
//                   // Get a list of giftcards
//                   agent.get('/api/giftcards')
//                      .end(function(giftcardsGetErr, giftcardsGetRes) {
//                         // Handle giftcard save error
//                         if (giftcardsGetErr) done(giftcardsGetErr);
//                         console.log('value of the giftcardGetRes'+giftcardsGetRes.body);
//                         // Get giftcards list
//                         var giftcards = giftcardsGetRes.body;
//                         // Set assertions
//                         // the user who sent the giftcard should have nothing in the list.
//                         // also the other user should have somehting in the list.
//                         (giftcards[0].purchaserofgiftcard).should.equal(userId);
//                         (giftcards[0].spenderofgiftcard).should.equal(userId2);
//                         (giftcards[0].amount).should.match(2000);
//                         // (giftcards[0].user1._id).should.equal(null);
//                         // Call the assertion callback
//                         done();
//                      });
//                });
//          });
//    });
//
//    it('should not be able to save Giftcard instance if not logged in', function(done) {
//       agent.post('/api/giftcards')
//          .send(giftcard)
//          .expect(401)
//          .end(function(giftcardSaveErr, giftcardSaveRes) {
//             // Call the assertion callback
//             done(giftcardSaveErr);
//          });
//    });
//
//    it('should not be able to get a list of Giftcards if not signed in', function(done) {
//       // TODO: come back ands structure this.
//       // Create new Giftcard model instance
//       giftcard.user = user1.id;
//       var giftcardObj = new Giftcard(giftcard);
//       // Save the Giftcard
//       giftcardObj.save(function() {
//          request(app).get('/api/giftcards/')
//             .expect(401)
//             .end(function(giftcardResponseErr, giftcardResponse) {
//                (giftcardResponse.body.message).should.match('User is not logged in');
//                done(giftcardResponseErr);
//             });
//       });
//    });
//
//    afterEach(function(done) {
//       User.remove().exec();
//       Giftcard.remove().exec();
//       done();
//    });
// });
//  -->
