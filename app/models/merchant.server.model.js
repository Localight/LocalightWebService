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
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required:'please enter an address'
  },
},
  businessInfo:{
    business_name:String,
    // figure out how to associate business_type with business
    business_type:String,
    address:{
      city:String,
      line1:String,
      line2:String,
      state:String,
      postal_code:String,
      country_code:String
    }
  }
  //TODO: add stuff for tricons
  //TODO: add stuff for percentage take out.
});

// want to make sure that phonenumber is unique in database,
/**
 * Find possible not used username
 */

//TODO: write method to validate that phonenumber is unique in database.
module.exports = mongoose.model('Merchant', MerchantSchema);
