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
   client = require('twilio')(config.twilio.accountSID, config.twilio.authTOKEN),
   User = mongoose.model('User'),
   Schema = mongoose.Schema;


/**
 * Giftcard Schema,
 * Included are the validations for the mongoose model.
 *
 */
// NOTE: Do I want to put the ability to validate whtether two id's belong to
// the same user or not? Do I want to do that in the controller or validate method?
//
/**
 * validation for names
 * @type {Array}
 */
// var nameValidator = [
//   validator({
//     validator: 'isLength',
//     arguments: [3, 50],
//     message: 'Name should be between 3 and 50 characters'
//   }),
//   validator({
//     validator: 'isAlphanumeric',
//     message: 'Name should contain alpha-numeric characters only'
//   })
// ];
// var phoneNumberValidator = [
//   validator({
//     validator: 'isLength',
//     arguments: [10, 11],
//     message: 'Phone Number should be between 11 and 12 numbers'
//   }),
//   validator({
//     validator: 'isNumeric',
//     message: 'Phone Number should contain numbers only',
//   })
// ];
// var emailValidator = [
//   validator({
//     validator: 'isEmail',
//     message: 'Please enter correct email'
//   })
// ];
var GiftcardSchema = new Schema({
   /*
    * The Name of the person to send this giftcard too.
    */
   //TODO: create a validator that can be used for names.
   //TODO: create a validator rule that can be used for amount
   //TODO: create a validator rule that can be used for number
   //TODO: create a validator rule that can be used for  email
   /**
    * [sentOutRecieptEmail used when the object is saved, so the program knows to send it out if it doesn't get sent.]
    * @type {Object}
    */
   sentOutRecieptEmail: {
      type: Boolean,
      default: false
   },
   /**
    * [sentOutText sent when the giftcard is created.]
    * @type {Object}
    */
   sentConfirmationText: {
      type: Boolean,
      default: false
   },
   /**
    * [giftRecipientFirstName this is the name of who is receiving the email]
    * @type {Object}
    */
   // giftRecipientFirstName: {
   //   type: String,
   //   // should have spaces to indcate first name and last name.
   //   // TODO: add regualer expressions.
   //   required: 'Please enter the recipients name.',
   //   validate: nameValidator
   // },
   /**
    * [giftSenderFirstName Name of the person who is sending the giftcard]
    * @type {Object}
    */
   // giftSenderFirstName: {
   //   type: String,
   //   required: 'Please enter the senders name.',
   //   validate: nameValidator
   // },
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
   // emailForReceipt: {
   //   type: String,
   //   validate:emailValidator,
   //   required: 'please enter a email',
   // },
   // Add emailForReceiptSent flag, so we know if the email has been sent or not.
   // In the presave method, the method will try to execute three times, befor
   // before sending an error to the adminstator, and showing that the system
   // has an error. hopefully throwing an error and stoping the transaction.
   // shoot email if not successfull return error. move on.
   // look up user by id.
   /**
    * [mobileNumberOfRecipient description]
    * @type {Object}
    */
   // mobileNumberOfRecipient: {
   //   type: String,
   //   required: 'Please enter the recipients phone number',
   //   validate: phoneNumberValidator
   //   //TODO: enter in regular expression, and make sure no spaces.
   // },
   // mobile Number of Recipient can't be the same as the mobile number of the receiver.
   //
   // mobileNumberOfSender: {
   //   type: String,
   //   required: 'Please enter the senders phone number',
   //   validate: phoneNumberValidator
   //   //TODO: enter in regular expression, and make sure no spaces.
   // },
   /**
    * [stripeCardToken token we use to charge the card, could be one time, not sure if I should be saving it.]
    * @type {Object}// probably going to delete this.
    */
   // stripeCardToken: {
   //   type: String
   // },
   /**
    * [stripeOrderId Provided when the giftcard is first purchased, and used when or if we need to refund the giftcard.]
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
   //  dateLastUpdate:{
   //     type: Date,
   //     default: Date.now
   // },
   // Date card created or purchased, might want to change the number.
   created: {
      type: Date,
      default: Date.now
   },
   //NOTE: figure out something for each time the giftfcard is updated. or spent.
   // Do I need the mercahnt id, since each giftcard can be partially used.
   // merchant: {
   //   type: Schema.ObjectId,
   //   ref: 'Merchant'
   // },
   fromUser: {
      type: Schema.ObjectId,
      ref: 'User',
      required: 'Please, enter the user id who is sending the giftcard.'
   },
   toUser: {
      type: Schema.ObjectId,
      ref: 'User',
      required: 'Please, enter the user id to send this giftcard too.'
   },
});
/**
 * Create instance method for finding users
 */
GiftcardSchema.methods.findTheUser = function(userIDThing) {
   User.findById(userIDThing, function(err, user) {
      if (err) {
         // figure out what to do if you don't find the user.
         return err;
      } else {
         return user;
      }
   });
};

// Create a class to help you find the user's by id.

GiftcardSchema.post('save', function(next) {
   // go find the user and get their phone number.
   // TODO: create a service to find get the user id's
   //
   var userA = this.findTheUser(this.fromUser);
   var userB = this.findTheUser(this.toUser);
   client.SendMessage({
      to: '+1' + userB.username,
      from: 'some number',
      body: userA.displayName + ' sent you a localism giftcard.' // give the user a message. or hyperlink
   });

   var smtpTransport = nodemailer.createTransport(config.mailer.options);
   var mailOptions = {
      to: this.emailForReceipt,
      from: 'gift-confirm@clique.cc',
      subject: 'Your Clique Card has been sent!',
      text: '\n\n' + userA.dipslayName + ', your gift of $' + this.amount + 'is on it&#39;s way to' + '! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area'
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
