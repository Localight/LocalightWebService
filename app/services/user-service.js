'use strict';

/**
 * Globals
 */
var mongoose = require('mongoose'),
   User = mongoose.model('User');

exports.locateEmailByUser = function(userId){
   User.findOne({
      'email':userId
   })
};
// given a userId return a email

// given a userId return a username

// given a userId tell me if a user exists or not if they don't create them.
