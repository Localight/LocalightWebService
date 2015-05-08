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
     arguments: [11, 12],
     message:'Phone Number should be between 11 and 12 numbers'
   }),
   validator({
     validator:'isNumeric',
     message:'Phone Number should contain numbers only',
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
  //
  giftRecipientFirstName: {
    type: String,
    // should have spaces to indcate first name and last name.
    // TODO: add regualer expressions.
    required: 'Please enter the recipients name.',
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
   emailForReceipt:{
    type:String,
    required:'please enter a email',
  },

  giftSenderFirstName:{
    type:String,
    required: 'Please enter the senders name.',
    validate: nameValidator
  },

  /**
   * [mobileNumberOfRecipient description]
   * @type {Object}
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
  occasion: {
    type: String,
    default: 'A gift for you!'
  },
  // Date card created or purchased, might want to change the number.
  created: {
    type: Date,
    default: Date.now
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
