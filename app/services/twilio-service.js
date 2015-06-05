'use strict';

// given a username/phonenumber send a confirmation text
// given a username/phonenumber send a text in general

var config = require('../../config/config'),
   client = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN),
   Q = require('q'),
   message = null;

exports.sendText = function(phonNumber) {
   client.sendMessage({
      to:'+1'+phonNumber,
      //from: localism number,
      body:'You got a text message from localism'
   }).then(function handler(response){
      console.log(response);
   }).catch(function errorHandler(err){
      console.log(err);
   });
};
