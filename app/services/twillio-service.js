'use strict';

var twilio = require('twilio');
var client;

exports.init = function(acctSid, authToken){
  client = twilio(acctSid, authToken);
};

exports.sendSMS = function(to, from, message, callback){
  client.messages.create({
    body: message,
    to: to,
    from: from
  },
  function(err, twilioResponse){
    callback(err, twilioResponse);
  });
};
