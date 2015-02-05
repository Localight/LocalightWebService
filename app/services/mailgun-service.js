'use strict';
var mailgun = require('mailgun'),
    mailcomposer = require('mailcomposer'),
    emailtemplates = require('email-templates');

var mg,
    domain,
    key,
    from;

// Setup function to be used on server activation
exports.init = function(config){
  key = config.apiKey;
  domain = config.domain;
  mg = new mailgun(key);
  from = config.from;
};

exports.sendEmail = function(from, to, body, callback){
  if (!callback){
    callback = function(){};
  }

  // Create dynamic message that is sent
  mg.sendRaw(
    from, // email sender
    to, // email recipient
    body,
    function(err) {
      if (err) {
        console.log('this sucks');
        callback(err);
      }
      else {
        callback();
      }
    }
  );
};
