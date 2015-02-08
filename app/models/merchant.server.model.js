'use strict';
// what's crucial is that we store the merchant's name, email, phone, and maybe a password at some point. We also
// want to store the merchants bank info. the bank info is the most important part.
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

<<<<<<< HEAD

=======
>>>>>>> balanceBackEnd
/**
 * Merchant Schema
 */
var MerchantSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
<<<<<<< HEAD
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
=======

  balancedStuff:{
    customerToken: '',
    href:String,
  },
  contactInfo: {
    first_name: {
      type: String,
      maxLength: 20,
      required: 'First Name of owner required',
    //  validate: nameValidator
      // validate:'nameValidator'
    },
    last_name: {
      type: String,
      maxLength: 20,
      required: 'Last Name of owner required',
      //validate: nameValidator
    },
    phone_number: {
      type: Number,
      required: 'Phone Number of owner required'
    },
    email_address: {
      type: String,
      maxLength: 20,
>>>>>>> balanceBackEnd
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required:'please enter an address'
  },
<<<<<<< HEAD
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
=======
  businessInfo: {
    business_name: {
      type: String,
      max: 20,
      //		required: 'company name required'
    },
    //TODO: validate that the address enter is valid.
    businessBillingAddress: {
      street: {
        type: String,
        max: 50,
        //				required: 'please enter the billing address for the business'
      },
      city: {
        type: String,
        max: 30,
        //			required:'please enter a city'
      },
      state: {
        type: String,
        max: 14,
        //		required:'please enter a state'
      },
      zipcode: {
        type: Number,
        //			required: 'plase enter a zipcode'
      }
    },
    //TODO: come back and work on address, I remember Address being tricky.
    //TODO: add tircon. or type.
  },
    // merchants need a percant
    // TODO: when working with the routing and account numbers, be sure the forms validate.
>>>>>>> balanceBackEnd
});

// want to make sure that phonenumber is unique in database,
/**
 * Find possible not used username
 */

//TODO: write method to validate that phonenumber is unique in database.
mongoose.model('Merchant', MerchantSchema);
