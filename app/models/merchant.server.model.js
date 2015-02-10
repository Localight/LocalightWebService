'use strict';
// what's crucial is that we store the merchant's name, email, phone, and maybe a password at some point. We also
// want to store the merchants bank info. the bank info is the most important part.
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Merchant Schema
 */
var MerchantSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  contactInfo:{
    first_name:{
      type:String,
      required:'First Name of Owner Required'
    },
    last_name:{
      type:String,
      required:'Last Name of Owner Required'
    },
    phone_number:{
      type:String,
      required:'please enter a phone number'
    },
    email_address:{
      type:String,
    },
  },
  balancedStuff:{
    customerToken: String,
    href:String,
  },
  businessInfo: {
    business_name: {
      type: String,
      max: 20,
      //		required: 'company name required'
    },
    // 

    //TODO: validate that the address enter is valid.
    // businessBillingAddress: {
    //   street: {
    //     type: String,
    //     max: 50,
    //     //				required: 'please enter the billing address for the business'
    //   },
    //   city: {
    //     type: String,
    //     max: 30,
    //     //			required:'please enter a city'
    //   },
    //   state: {
    //     type: String,
    //     max: 14,
    //     //		required:'please enter a state'
    //   },
    //   zipcode: {
    //     type: Number,
    //     //			required: 'plase enter a zipcode'
    //   }
    //},
    //TODO: come back and work on address, I remember Address being tricky.
    //TODO: add tircon. or type.
  },
    // merchants need a percant
    // TODO: when working with the routing and account numbers, be sure the forms validate.

});

// want to make sure that phonenumber is unique in database,
/**
 * Find possible not used username
 */

//TODO: write method to validate that phonenumber is unique in database.
mongoose.model('Merchant', MerchantSchema);
