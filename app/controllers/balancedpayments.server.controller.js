'use strict';

/**
 * Module dependencies.
 */
var balanced = require('balanced-offical'),
  mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Merchant = mongoose.model('Merchant'),// this is where I might change it to user, and keep merchant a type attribute
  _ = require('lodash');
// will contain more data for balanced payemnts
  /**
   * Tokenize a bankAccount || credit card.
   */
   balanced.configure('TEST-MP64VYOM3SE79TEgc4WIlgXu');

   exports.tokenizeInfo = function(req, res) {

   };


//   exports.tokenizeThisBitch
// this controller should handle most stuff that has to do with the accounts.
