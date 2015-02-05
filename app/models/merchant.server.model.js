'use strict';
// what's crucial is that we store the merchant's name, email, phone, and maybe a password at some point. We also
// want to store the merchants bank info. the bank info is the most important part.
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 var validate = require('mongoose-validator');
// need to work on the validations.
// get help with validator and move on.
// what we will use validators for, make sure numbers are correct, and lengths are the right size.
var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [5,20],
    message: 'Name should be between 3 and 15 characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numerica characters only',
  })
];
// var nameValidator = [
// 	validate({
// 		validator: 'isLength',
// 		arguments: [5, 20],
// 		message: 'Name should be between 3 and 20 characters'
// 	}),
// 	validate({
// 		validator: 'isAlphanumeric',
// 		passIfEmpty: true,
// 		message: 'Name should contain alpha-numeric characters only'
// 	}),
// ];
/**
 * Merchant Schema
 */
var MerchantSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  ownerContactInfo: {
    ownerFirstName: {
      type: String,
      maxLength: 20,
      required: 'First Name of owner required',
    //  validate: nameValidator
      // validate:'nameValidator'
    },
    ownerLastName: {
      type: String,
      maxLength: 20,
      required: 'Last Name of owner required',
      //validate: nameValidator
    },
    ownerPhoneNumber: {
      type: Number,
      required: 'Phone Number of owner required'
    },
    ownerEmailAddress: {
      type: String,
      maxLength: 20,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: 'email address of owner required'
    }
  },
  businessInfo: {
    legalCompanyName: {
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
    companyWebsite: {
      type: String,
    },
    storeFrontName: {
      type: String,
      max: 20,
      //			required: 'please enter a store front name'
    }
    //TODO: come back and work on address, I remember Address being tricky.
    //TODO: add tircon. or type.
  },
  // for testing purpose only:
  // need to figu
  kickbackSplit: [{
      merchant: String,
      percentage: Number
    }]
    // merchants need a percant
    // TODO: when working with the routing and account numbers, be sure the forms validate.
});

// want to make sure that phonenumber is unique in database,
/**
 * Find possible not used username
 */

//TODO: write method to validate that phonenumber is unique in database.
module.exports = mongoose.model('Merchant', MerchantSchema);
