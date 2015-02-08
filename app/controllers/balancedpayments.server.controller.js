'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  balanced = require('balanced-official'),
  errorHandler = require('./errors.server.controller'),
  Merchant = mongoose.model('Merchant'),// this is where I might change it to user, and keep merchant a type attribute
  _ = require('lodash');
  balanced.configure('ak-test-243p045kOCxSDITqcndq40XGNK60zQ7Ft');
// will contain more data for balanced payemnts
  /**
   * Tokenize a bankAccount || credit card.
   */

   exports.init = function(apiKey){
     balanced.configure(apiKey);
   };
  // balanced.configure('TEST-MP64VYOM3SE79TEgc4WIlgXu');
   // Create customers,
   // connect customers to bank accounts
   // connect customers to bank cards
   // payout customers
   // charge customers
   exports.createCustomer = function(req, res) {

     var merchant = new Merchant(req.body);
     var payload = {
       email: req.body.email_address,
       // address:{
       //  			// 	city: this.city,
       //  			//  	country_code:this.country_code,
       //  			//  	line1: this.line1,
       //  			//  	line2: this.line2,
       //  			//  	postal_code: this.postal_code,
       //  			// 	state: this.state,
       //  			// 	},
       name: req.body.first_name + ' ' +req.body.last_name,
       business_name: req.body.business_name,
       phone: req.body.phone,
    };//end customerInfo
     var customer = balanced.marketplace.customers.create(payload);// function(response){
     console.log(customer.body.id);
    //      if(response.status === 201){
    //        alert(response.error.description);
    //        return;
    //      }else{
    //        console.log(response.body.href);
    //      }
    //     // merchant.href = response.body.href;
    //     // response.send('Your URI is: '+request.body.card_uri);
    //     // console.log(merchant);
    //      //merchant.href = response.data.href;
    //      console.log(response);
    //   });
    //   console.log(customer);
  };
//   exports.tokenizeThisBitch
// this controller should handle most stuff that has to do with the accounts.
