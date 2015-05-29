// <!-- 'use strict';
// var should = require('should'),
//    request = require('supertest'),
//    app = require('../../server'),
//    mongoose = require('mongoose'),
//    User = mongoose.model('User'),
//    // Giftcard = mongoose.model('Giftcard'),
//    agent = request.agent(app); // this is allows us to persist and save cookies
//
// /**
//  *  Global variables
//  */
// var user, card, credentials;
//
// /**
//  * Stripe Routes Test
//  */
//
// describe('Stripe Route Tests', function() {
//    beforeEach(function(done) {
//       // Why are we creating a user?
//       // It should be assumed that a logged in user is the one creating the charge.
//       // at some point we will want to add a little bit of validation to
//       // make sure that everyone in the web can't access this.
//       // I'm still not sure where or how to bind the param to the api.
//       // So simulate a user for the sake of testing.
//       // Create user credentials
//       credentials = {
//          username: 'username',
//          password: 'password'
//       };
//       user = new User({
//          firstName: 'Test',
//          lastName: 'M',
//          displayName: 'M',
//          email: 'test@test.com',
//          stripeCustomerToken: 'cus_6HXDv78qJwjPto',
//          stripeCardToken: 'card_164yAwBNPqu3SRN2Y28kJMvR',
//          provider: 'local'
//       });
//       user.save();
//       done();
//    });
//
//    it('should be able to create a charge, given the credentials are correct.', function(done) {
//       var amount = 400;
//
//       agent.post('/auth/signin')
//          .send(credentials)
//          .expect(200)
//          .end(function(signinErr, signinRes) {
//             // handle signin error
//             if (signinErr) done(signinErr);
//
//             agent.post('/stripe/charge')
//             .send(amount)
//             .expect(200)
//          });
//    });
//
//    afterEach(function(done){
//       User.remove().exec();
//       done();
//    });
// });
//  -->
