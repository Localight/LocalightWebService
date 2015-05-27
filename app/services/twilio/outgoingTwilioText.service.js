'use strict';

var config = require('../../../config/config'),
    Q = require('q'),
    nodemailer = require('nodemailer'),
    _ = require('lodash'),
    async = require('async'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    client = require('twilio')(config.twilio.accountSID, config.twilio.authTOKEN);

exports.sendConfirmationText = function(something) {
   User.findById(something, function(err, user){
      if(err){
         console.log(err.message);
      }
      client.sendMessage({
         to:'+1'+user.username,
         // from should be the number for the localism account.
         from:'+1562-445-4688',
         body:'You have just recevied a Local Giftcard, Check your account now.',
      });
   });
};
