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
if (req.body.Body.toLowerCase() === 'gift') {
      console.log(req.body);
         User.findOne({
         'username': req.body.Body.slice(2, 12)
      }, function(err, user) {
         // In case of any error return
         if (err) {
            console.log('the error from twilio' + err);
            return (err);
         }
         // already exists
      if (user) {
            console.log('the user ' + user);
            client.messages.create({
               body: JSON.stringify(user),
               to: req.body.From,
               from: '+15624454688',
            }, function(err, message) {
               if (err) {
                  console.log(err);
               }
               if (message) {
                  console.log(message.sid);
               }
            });
         } else {
            // if user is not found create here.
            // if there is no user with that phoneNumber
            // create the user, with the data entered on the giftcard
            var anotherUser = new User();
            anotherUser.username = req.body.Body.slice(2, 12);
            // set the user's local credentials
            //  anotherUser.firstName = req.body.firstName;
            // anotherUser.password = createHash(password);//TODO: come back to this.
            anotherUser.password = 'password'; //TODO: figure out how to handle new user signup later.
            //  anotherUser.mobileNumber = req.body.mobileNumber;
            anotherUser.provider = 'local';
            //  anotherUser.email = req.body.email;
            var payload = {
               description: 'test stuff'
            };
            // passport
            //
            stripe.customers.create(payload).then(function handler(response) {
               // get and save the new users's token.
               anotherUser.stripeCustomerTokenThing = response.id;
               return anotherUser.save(); // saves user here.
            }).then(function anotherHandler(response) {
               return client.messages.create({
                  body: JSON.stringify(anotherUser),
                  to: req.body.From,
                  from: '+15624454688',
               }, function(err, message) {
                  if (err) {
                     console.log(err);
                  }
                  if (message) {
                     console.log(message.sid);
                  }
               });
            }).catch(function errHandler(err) {
               return res.status(400).send(err);
            });
            // tokenize user as well.
            //TODO: need to figure out how and when to do that for user.
            // in theory could add it to the sign in, then if they have a token already it doesn't fire.
            // save the user
         }
      });
   } else {
      // need to make sure I handle the errors so that the server doesn't crash
      console.log('attempt made to server, Body was:' + req.body.Body);
   }
};
};
