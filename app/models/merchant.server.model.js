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
  //TODO: come back and add option for account type, checking or savings.
  customerToken:String,
  accountToken:String,
  first_name:String,
  last_name:String,
  phone:String,
  email_address:String,
  account_number:String,
  routing_number:String,
  address:{
    line1: String,
    line2: String,
    city:  String,
    zipcode: String,
    state:String,
  }
  // add tricon,
  // add percentage,// needs to be a number I think.

    // merchants need a percant
    // TODO: when working with the routing and account numbers, be sure the forms validate.
    // TODO: need to add percentage and tri con thing.
});

// want to make sure that phonenumber is unique in database,
/**
 * Find possible not used username
 */

//TODO: write method to validate that phonenumber is unique in database.
mongoose.model('Merchant', MerchantSchema);
