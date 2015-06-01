'use strict';
var nodemailer = require('nodemailer'),
   config = require('../config/config');

exports.sendEmailReceipt = function(to, from, body) {
   var smtpTransport = nodemailer.createTransport(config.mailer.options);
   var mailOptions = {
      to: to,
      from: from,
      subject: 'Your Clique Card has been sent!',
      text: '\n\n' + this.purchaserofgiftcard.dipslayName + ', your gift of $' + this.amount + 'is on it&#39;s way to' + '! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area'
   };
   smtpTransport.sendMail(mailOptions, function(error) {
      if (error) {
         console.log('error');
         return error;
         //TODO: need to find out if there is a way to send a response from the model
      }
      this.send({
         message: 'An email has been sent to ' + this.purchaserofgiftcard.email + ' with further instructions.'
      });
   });
};
