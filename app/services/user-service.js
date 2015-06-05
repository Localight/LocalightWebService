'use strict';

/**
 * Globals
 */
var mongoose = require('mongoose'),
   User = mongoose.model('User');

// given a userId return a email
exports.locateEmailByUser = function(userId){
   User.findOne({
      _id: userId
   }).exec(function(err, user){
      if(err){
         return err;
      }
      if(!user){
         return (new Error('Failed to locate User '+userId));
      }
      return user.email;
   });
};

// Given a user Id return a username
exports.findPhoneNumberByUser = function(userId){
   User.findOne({
      _id: userId
   }).exec(function(err, user){
      if(err){
         return err;
      }
      if(!user){
         return (new Error('Failed to locate User '+userId));
      }
      return user.username;
   });
};


// given a userId tell me if a user exists or not if they don't create them.
