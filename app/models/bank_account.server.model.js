'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Bank_AccountSchema = new Schema({
  
  created: {
    type: Date,
    default: Date.now
  },
  // what do
  // copy the data you need for crediting accounts and stuff.
  //account type
  //bank name
  // can credit,
  // can debt
  // created date,
  // finger print,
  // href,
  // id,
  // or just the token
  owner: {
    type: Schema.ObjectId,
    ref:'Merchant'
  }
});
module.exports = mongoose.model('Bank_Account', Bank_AccountSchema);
