'use strict';

/**
 *  Module dependencies.
 *
 */
var mongoose = require('mongoose'),
   User = mongoose.model('User'),
   errorHandler = require('./errors.server.controller'),
   config = require('../../config/config'),
   client = require('twilio')('AC9bfd970cef5934b23e69f1ef72812a23', 'a6bfeeed497cfb9b8d10c329ce721759'),
   // TODO: come back and delete these later.
   Q = require('q'),
   _ = require('lodash');
//require the Twilio module and create a REST client

exports.interceptTwilioMesage = function(request, response) {
   // this is what the response from twilio is sending.
   //
   // this is a controller, but you do everything in a controller.
   // getting user from database.
   // doing to much in controller.
   // user.service, pass in phone number. return the object as promise or callback.
   if (request.body.Body.toLowerCase() === 'gift') { // lowercase anything in the body of the response
      // start easy and just send back a url.
      client.messages.create({
         body: '💌📲 Send a gift to anyone in Greater Long Beach ▸ ',
         to: request.body.From,
         from: '+15624454688',
      }, function(err, message){
         if (err) {
            console.log(err);
         }
         if (message) {
            console.log(message.sid);
         }
      });
   } else {

      console.log('attempt made to server, Body was:' + request.body.Body);
   }
};
