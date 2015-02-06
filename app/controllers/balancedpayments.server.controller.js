'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  balanced = require('balanced-official'),
  errorHandler = require('./errors.server.controller'),
  Merchant = mongoose.model('Merchant'),// this is where I might change it to user, and keep merchant a type attribute
  _ = require('lodash');
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
     balanced.configure('ak-test-243p045kOCxSDITqcndq40XGNK60zQ7Ft');
     var merchant = new Merchant(req.body);
     var payload = {
       email: req.email_address,
       // address:{
       //  			// 	city: this.city,
       //  			//  	country_code:this.country_code,
       //  			//  	line1: this.line1,
       //  			//  	line2: this.line2,
       //  			//  	postal_code: this.postal_code,
       //  			// 	state: this.state,
       //  			// 	},
       name: req.first_name + ' ' +req.last_name,
       business_name: req.business_name,
       phone: req.phone,
       };//end customerInfo
     balanced.marketplace.customers.create(payload, function(response){
      // Handle Errors (Anything that's not Success Code 201)
      if(response.status !== 201){// come back and change status to status_code
        alert(response.error.description);
        return;
      }else{
        //TODO: put an error code here or something.
        console.log('handleResponse failed');
          }
        merchant.href = response.href;
      });

    //  merchant.save(function(err){
    //    if(err){
    //      return res.status(400).sent({
    //        message: errorHandler.getErrorMessage(err)
    //      });
    //    }else{
    //      // Remove sensitive data before login
    //      res.json(merchant);
    //    }
    //  });
     // or in balanced terms create a customer.
     // var merchant = new Merchants({
     // 	//get only the info we need for our model.
     // 	contactInfo:{
     // 		first_name: this.first_name,
     // 		last_name: this.last_name,
     // 		phone_number: this.phone_number,
     // 		email_address: this.email_address,
     // 		},
     // 	businessInfo:{
     // 		business_name:this.business_name,
     // 		// address:{
     // 		// 	city:this.city,
     // 		//   line1:this.line1,
     // 		// 	line2:this.line2,
     // 		// 	state:this.state,
     // 		// 	postal_code:this.postal_code,
     // 		// 	country_code:this.country_code
     // 		//	}
     // 		}});
     //
   };


//   exports.tokenizeThisBitch
// this controller should handle most stuff that has to do with the accounts.
