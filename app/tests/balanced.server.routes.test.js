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
var  passingCreditCard, failingCreditCard, merchant, merchantBankAccount, cardTokenThing, customerTokenThing;

describe('Balanced-Controller API tests', function() {
  beforeEach(function(done) {
    // a passing credit card, not yet tokenized fool!
    passingCreditCard = {
      name:'Some one',
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
    cardTokenThing = '/cards/CC4GRkqY8x8uszvmEca6k9IX';
    customerTokenThing = '/customers/CU5sGKYG4NcNr753rE2Qn5Pf';
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
  it('should be able to tokenize a credit card successfuly', function(done){
    agent.post('/tokenizeCard')
    .send(passingCreditCard)
    .end(function(tokenizationErr, tokenizationRes){
      // Handle article save error
      if (tokenizationErr) done(tokenizationErr);
      // not sure what to check for. need to create a reqular expression that just checks for "/cards/", don't care about the part after.
      
      done();
    });
  });
  it('should be able to charge a card succesfully', function(done){
    var payload = {
      amount: 233,
      customerTokenThing:'/customers/CU5sGKYG4NcNr753rE2Qn5Pf',
      cardTokenThing:'/cards/CC4GRkqY8x8uszvmEca6k9IX'
    };
    agent.post('/chargeCard')
    .send(payload)
    .end(function(balancedErr, balancedRes){
      // handle errors
      if (balancedErr) done(balancedErr);
      // not sure what to check for. need to create a reqular expression that just checks for "/debits/", don't care about the part after.
      done();
    });
  });
});
