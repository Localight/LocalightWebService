// use strict';
//
// var config = require('../../../config/config'),
//     Q = require('q'),
//     nodemailer = require('nodemailer'),
//     _ = require('lodash'),
//     async = require('async'),
//     mongoose = require('mongoose'),
//     User = mongoose.model('User');
//
// exports.sendReceiptEmail = function(id){
//    User.findById(id, function(err, user) {
//       if (err) {
//          console.log(err.message);
//       }
//       var smtpTransport = nodemailer.createTransport(config.mailer.options);
//       var mailOptions = {
//          to: user.email,
//          from: 'gift-confirm@clique.cc',
//          subject: 'Your Clique Card has been sent!',
//          text: 'nn' + user.dipslayName + ', your gift of $' + this.amount + 'is on it&#39;s way to' + '! With the CLIQUE Local Gift Card you can apply your gift toward purchases at numerous locally-owned merchants in the Long Beach area'
//       };
//       smtpTransport.sendMail(mailOptions, function(error) {
//          if (!error) {
//             console.log(mailOptions);
//             // this.send({
//             //   message: 'An email has been sent to ' + this.purchaserofgiftcard.email + ' with further instructions.'
//             // });
//             //TODO: need to find out if there is a way to send a response from the model
//          } else {
//             console.log('got an error: ', error.message);
//          }
//       });
//    });
//
// };
