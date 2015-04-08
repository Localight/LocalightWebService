'use strict';
// I want to change gift card to CliqueCard, will do that later though.
// I can do that in a night.
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  nodemailer = require('nodemailer'),
  config = require('./../../config/config'),
  // Mailgun = require('mailgun-js')({
  //   apiKey: 'key-212g0rzf7j9z-n9b7zdl797o3bxrsu38',
  //   domain: 'https://api.mailgun.net/v3/rs56424.mailgun.org'
  // }),
  Schema = mongoose.Schema;

/**
 * Giftcard Schema
 */
var GiftcardSchema = new Schema({
  /*
   * The Name of the person to send this giftcard too.
   */
  giftRecipientName: {
    type: String,
    // should have spaces to indcate first name and last name.
    // TODO: add regualer expressions.
    required: 'Please enter the recipients name.'
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
   emailForReceipt:{
    type:String,
    required:'please enter a email',
  },
  /*
   * Crucial part, we need a mobile number to send the giftcard too. this is a primary key.
   * it also gives us the means to verify this users phone.
   */
  mobileNumberOfRecipient: {
    type: Number,
    required: 'Please enter the recipients phone number',
    //TODO: enter in regular expression, and make sure no spaces.
  },
  stripeCardToken: {
    type: String
  },
  /**
   * [stripeOrderId Provided everytime a gifcard is object, will for user to be refunded.]
   * @type {String}
   */
  stripeOrderId: {
    type: String,
    required: 'You must save the order Id.'
  },
  /**
   *  Message, the message that the user wishes for another user to see.
   *  a message doesn't need to have a string attached to it.
   */
  giftMessage: {
    type: String,
    default: 'A gift for you!'
  },
  // Date card created or purchased, might want to change the number.
  created: {
    type: Date,
    default: Date.now
  },
  user: { // this is how the object is stored when it is created.
    type: Schema.ObjectId,
    ref: 'User'
  },
  merchant: {
    type: Schema.ObjectId,
    ref: 'Merchant'
  },
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
    text: '\n\n'+ this.fromUser.dipslayName +', your gift of $'+ this.amount + 'is on it&#39;s way to'+'! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area'
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
