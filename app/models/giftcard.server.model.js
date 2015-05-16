'use strict';
// I want to change gift card to CliqueCard, will do that later though.
// I can do that in a night.

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
   //  twilioService = require('../services/twilio/outgoingTwilioText.service'),
   Schema = mongoose.Schema;

/**
 * Giftcard Schema,
 * Included are the validations for the mongoose model.
 */

var GiftcardSchema = new Schema({
   /**
    * Amount, the value of which the card holds, to be spent at a merchant's busienss.
    * @type {Object}
    */
   amount: {
      type: Number,
      required: 'Please enter an amount to purchase.'
   }, // need to make sure it's always a number and never zero or a negative number.


   /**
    * [stripeOrderId Provided when the giftcard is first purchased, and used when or if we need to refund the giftcard.]
    * @type {String}
    */
   // for initial purchase.
   stripeOrderId: {
      type: String,
      //required: 'You must save the order Id.'
   }, // I should only get a order once

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
   }
});

/**
 * Hook a pre save method to email the reciepiet
 */
// GiftcardSchema.pre('save', function(next) {
//
//   var smtpTransport = nodemailer.createTransport(config.mailer.options);
//   var mailOptions = {
//     to: this.emailForReceipt,
//     from: 'gift-confirm@clique.cc',
//     subject: 'Your Clique Card has been sent!',
//     text: '\n\n'+ this.fromUser.dipslayName +', your gift of $'+ this.amount + 'is on it&#39;s way to'+'! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area'
//   };
//   smtpTransport.sendMail(mailOptions, function(error) {
//     if (!error) {
//       console.log(mailOptions);
//       // this.send({
//       //   message: 'An email has been sent to ' + this.fromUser.email + ' with further instructions.'
//       // });
//       //TODO: need to find out if there is a way to send a response from the model
//     } else {
//       console.log('got an error: ', error);
//     }
//   });
//   next();
// });
/**
 * Hook a post save method to send out emails and texts
 */
//  GiftcardSchema.post('save', function(next) {
//     twilioService.sendConfirmationText(this.toUser);
//    //  mailgunService.sendReceiptEmail(this.fromUser);
// 	next();
// });

mongoose.model('Giftcard', GiftcardSchema);
