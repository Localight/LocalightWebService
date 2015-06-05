'use strict';

var nodemailer = require('nodemailer'),
   config = require('../../config/config'),
   smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Right now this only sends reciepts but could be use for other things in the future.
 * @param  {[type]} to   [description]
 * @param  {[type]} body [description]
 * @return {[type]}      [description]
 */
exports.sendEmailReceipt = function(anEmail) {
   // The basic info of what is contained in a email.
   // This could contain a html page that has been created.
   var mailOptions = {
      to: anEmail,// to param should be a valid email.
      from: config.MAILER_FROM,
      subject: 'Your Clique Card has been sent!',
      text: '\n\n' + ', your gift of $' + this.amount + 'is on it&#39;s way to' + '! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area'
   };

   smtpTransport.sendMail(mailOptions, function(error, info) {
      if(error){
         console.log(error);
      } else{
         console.log('message sent: ' + info.response);
      }
   });

};
