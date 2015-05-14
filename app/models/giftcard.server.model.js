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
var GiftcardSchema = new Schema({
   /*
    * The Name of the person to send this giftcard too.
    */
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
    * Amount, the value of which the card holds, to be spent at a merchant's busienss.
    * @type {Object}
    */
   amount: {
      type: Number,
      required: 'Please enter an amount to purchase.'
   },
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
   User.findById(this.toUser, function(err, user) {
      if (err) {
         console.log(err.message);
      }
      client.SendMessage({
         to: '+1' + user.username,
         from: 'some number',
         body: userA.displayName + ' sent you a localism giftcard.' // give the user a message. or hyperlink
      });
   });
   User.findById(this.fromUser, function(err, user) {
      var smtpTransport = nodemailer.createTransport(config.mailer.options);
      var mailOptions = {
         to: user.emailForReceipt,
         from: 'gift-confirm@clique.cc',
         subject: 'Your Clique Card has been sent!',
         text: '\n\n' + user.dipslayName + ', your gift of $' + this.amount + 'is on it&#39;s way to' + '! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area'
      };
      smtpTransport.sendMail(mailOptions, function(error) {
         if (!error) {
            console.log(mailOptions);
            // this.send({
            //   message: 'An email has been sent to ' + this.fromUser.email + ' with further instructions.'
            // });
            //TODO: need to find out if there is a way to send a response from the model
         } else {
            console.log('got an error: ', error.message);
         }
      });
   });
   next();
});

mongoose.model('Giftcard', GiftcardSchema);
