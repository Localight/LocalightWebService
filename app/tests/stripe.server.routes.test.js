'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    agent = request.agent(app);

    /**
     * The purpose of this test is to make sure the Stripe
     * Controller returns the correct results.
     */

    /**
     * Globals
     */
    var credentials, user;

    describe('Stripe Route Tests: ', function(){
      beforeEach(function(done){
         credentials = {
            username: '1234567890',
            password: 'password'
         };// end credentials
         user = new User({
            firstName: 'Someone',
            lastName: 'who',
            displayName: 'Someone Who',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local',
            stripeCustomerToken:'cus_6F4IWktgFqPHj3',
            stripeCardToken:{
               primary: 'card_162aBuBNPqu3SRN2d2hCYAKD'
            }// end stripecard token
         });// end user
         user.save();
         done();
      });

      it('should be able to charge a card if a user is signed in.', function(done){
         agent.post('/auth/signin')
         .send(credentials)
         .expect(200)
         .end(function(signinErr, signinRes){
            // Handle signin error
            if (signinErr) done(signinErr);

            agent.post('/')
         });
      });

   });
