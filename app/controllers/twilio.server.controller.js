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
<<<<<<< HEAD
   console.log(request.body);
	console.log('got here');
=======

   console.log('The controller got hit, this is the resposne: ' + JSON.stringify(request.body));
>>>>>>> ff452012709ddaf84c886ff810421d40bec0e460
   // this is what the response from twilio is sending.
   //
   // this is a controller, but you do everything in a controller.
   // getting user from database.
   // doing to much in controller.
<<<<<<< HEAD
   // user.service, pass in phone nu:mber. return the object as promise or callback.
   console.log(request.body.Body.toLowerCase());
   if (request.body.Body.toLowerCase() !== 'gift') { // lowercase anything in the body of the response
      console.log('attempt made to server, Body was:' + request.body.Body);
   } else {
	console.log('just before the messge is sent');
=======
   // user.service, pass in phone number. return the object as promise or callback.

   if (request.body.Body.toLowerCase() === 'gift') { // lowercase anything in the body of the response
>>>>>>> ff452012709ddaf84c886ff810421d40bec0e460
      // start easy and just send back a url.
      client.messages.create({
         body: '💌📲 Send a gift to anyone in Greater Long Beach ▸ ',
         to: request.body.From,
         from: '+15624454688',
<<<<<<< HEAD
      }, function(err, message){
	if(err){
	  console.log(err);
	}
	if(message){
        console.log(message.body);
	}
=======
      }, function(err, message) {
         if (err) {
            console.log(err);
         }
         if (message) {
            console.log(message.sid);
         }
>>>>>>> ff452012709ddaf84c886ff810421d40bec0e460
      });
   } else {

      console.log('attempt made to server, Body was:' + request.body.Body);
   }
};
