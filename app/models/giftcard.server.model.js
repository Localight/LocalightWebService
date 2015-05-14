'use strict';
// I want to change gift card to CliqueCard, will do that later though.
// I can do that in a night.
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  nodemailer = require('nodemailer'),
  config = require('./../../config/config'),
  validator = require('mongoose-validator'),
  mailgunClient = require('mailgun-js')(config.mailgun.apiKey, config.mailgun.domian),
  Schema = mongoose.Schema;

/**
 * Giftcard Schema,
 * Included are the validations for the mongoose model.
 *
 */
/**
 * validation for names
 * @type {Array}
 */
var nameValidator = [
  validator({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between 3 and 50 characters'
  }),
  validator({
    validator: 'isAlphanumeric',
    message: 'Name should contain alpha-numeric characters only'
  })
];
var phoneNumberValidator = [
  validator({
    validator: 'isLength',
    arguments: [10, 11],
    message: 'Phone Number should be between 11 and 12 numbers'
  }),
  validator({
    validator: 'isNumeric',
    message: 'Phone Number should contain numbers only',
  })
];
var emailValidator = [
  validator({
    validator: 'isEmail',
    message: 'Please enter correct email'
  })
];
var GiftcardSchema = new Schema({
  /*
   * The Name of the person to send this giftcard too.
   */
  //TODO: create a validator that can be used for names.
  //TODO: create a validator rule that can be used for amount
  //TODO: create a validator rule that can be used for number
  //TODO: create a validator rule that can be used for  email

  /**
   * [giftRecipientFirstName this is the name of who is receiving the email]
   * @type {Object}
   */
  giftRecipientFirstName: {
    type: String,
    // should have spaces to indcate first name and last name.
    // TODO: add regualer expressions.
    required: 'Please enter the recipients name.',
    validate: nameValidator
  },
  /**
   * [giftSenderFirstName Name of the person who is sending the giftcard]
   * @type {Object}
   */
  giftSenderFirstName: {
    type: String,
    required: 'Please enter the senders name.',
    validate: nameValidator
  },
  /**
   * Amount, the value of which the card holds, to be spent at a merchant's busienss.
   * @type {Object}
   */
  amount: {
    type: Number,
    required: 'Please enter an amount to purchase.'
  },
  /**
   * [receiptEmail description]
   * @type {Object}
   */
  emailForReceipt: {
    type: String,
    validate:emailValidator,
    required: 'please enter a email',
  },

  /**
   * [mobileNumberOfRecipient description]
   * @type {Object}
   */
  mobileNumberOfRecipient: {
    type: String,
    required: 'Please enter the recipients phone number',
    validate: phoneNumberValidator
    //TODO: enter in regular expression, and make sure no spaces.
  },
  // mobile Number of Recipient can't be the same as the mobile number of the receiver.
  //
  mobileNumberOfSender: {
    type: String,
    required: 'Please enter the senders phone number',
    validate: phoneNumberValidator
    //TODO: enter in regular expression, and make sure no spaces.
  },
  /**
   * [stripeCardToken token we use to charge the card, could be one time, not sure if I should be saving it.]
   * @type {Object}// probably going to delete this.
   */
  stripeCardToken: {
    type: String
  },
  /**
   * [stripeOrderId Provided when the giftcard is first purchased, and used when or if we need to refund the giftcard.]
   * @type {String}
   */
  stripeOrderId: {
    type: String,
    //required: 'You must save the order Id.'
  },
  /**
   *  Message, the message that the user wishes for another user to see.
   *  a message doesn't need to have a string attached to it.
   */
  occasion: {
    type: String,
    default: 'A gift for you!'
  },
 //  dateLastUpdate:{
 //     type: Date,
 //     default: Date.now
 // },
  // Date card created or purchased, might want to change the number.
  created: {
    type: Date,
    default: Date.now
  },
  // Do I need the mercahnt id, since each giftcard can be partially used.
  // merchant: {
  //   type: Schema.ObjectId,
  //   ref: 'Merchant'
  // },
  fromUser: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Enter who this is from.'
  },
  toUser: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Please Enter a User to send this too.'
  },
});
/**
 * Hook a pre save method to email the reciepiet
 */
GiftcardSchema.pre('save', function(next) {
  var smtpTransport = nodemailer.createTransport(config.mailer.options);
  var mailOptions = {
    to: this.emailForReceipt,
    from: 'gift-confirm@clique.cc',
    subject: 'Your Clique Card has been sent!',
    text: '\n\n' + this.fromUser.dipslayName + ', your gift of $' + this.amount + 'is on it&#39;s way to' + '! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area'
  };
  smtpTransport.sendMail(mailOptions, function(error) {
    if (!error) {
      console.log(mailOptions);
      // this.send({
      //   message: 'An email has been sent to ' + this.fromUser.email + ' with further instructions.'
      // });
      //TODO: need to find out if there is a way to send a response from the model
    } else {
      console.log('got an error: ', error);
    }
  });
  next();
});

mongoose.model('Giftcard', GiftcardSchema);
