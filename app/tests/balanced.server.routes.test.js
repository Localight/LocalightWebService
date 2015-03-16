'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
  request = require('supertest'),
  app = require('../../server'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Giftcard = mongoose.model('Giftcard'),
  Merchant = mongoose.model('Merchant'),
  agent = request.agent(app);

/**
  *  Globals
  */
// when testing creditcards use the different types of credit cards to test different conditions.
var credentials, user, giftcard, passingCreditCard, failingCreditCard, merchant, merchantBankAccount;

describe('Balanced-Controller API tests', function() {
  beforeEach(function(done) {
    credentials = {
      username: 'username',
      password: 'password',
      };
      user = new User({
        firstName: 'James',
        lastName: 'Hall',
        displayName: 'James Hall',
        email: 'greatwolf3d@gmail.com',
        username: credentials.username,
        password: credentials.password,
        provider: 'local',
        mobileNumber:2132203433
      });
    // Create user credentials
    user.save();
    console.log(user);
    giftcard = new Giftcard({
      giftRecipientName:'James Hall',
      amount:1300,
      mobileNumberOfRecipient:2132203433,
      toUser:user.id
    });
    console.log(giftcard.toUser);
    giftcard.save();
    console.log(giftcard);
    // a passing credit card, not yet tokenized fool!
    passingCreditCard = {
      expiration_month:7,
      expiration_year:17,
      number:4342561111111118,// debit card
      address:'someplace somewhere',
      city:'ho ho islabd',
      line2:'ho eeh shesad',
      state:'CA',
      postal_code: 94301,
      cvv:123
    };// this might not get saved.. not sure yet.
    merchant = new Merchant({
      name:'DW Ferral',
      business_name:'Localism',
      ein:1234569,
      email:'somethign@something.com',
    });
    merchant.save();
    merchantBankAccount = {
      accountNumber:'9900000002',
      routingNumber:'021000021'
    };

    // first thing tokenize the customer and get a customer token.

    // tokenize everything. first.
    // make sure you tokenize the someting abotu the user.

    // then test every interaction. use the controllers to simulate what the app will be doing.
    // test everything!
  // Create a giftcard.
  });


});
