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
  customerToken: String,
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
  businessInfo: {
    business_name: {
      type: String,
      max: 20,
      required: 'company name required'
    },
    address:{
      line1:{
        type:String,
        max: 50,
        required: 'please enter a street address'
      },
      line2:{
        type:String,
        max: 50,
      },
      city:{
        type:String,
        max: 30,
      },
      state:{
        type:String,
        max: 14,
      },
      postal_code:{
        type:String,
        max:8
      }
    }
  },
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
