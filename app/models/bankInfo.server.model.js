'use strict';

/**
* modules dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var BankInfoSchema = new Schema({
  created:{
    type: Date,
    default: Date.now
  },
  merchant:{
    type: Schema.ObjectId,
    ref: 'Merchant'
  }
  //this is where we put what ever token we get back. 

});

module.exports = mongoose.model('BankInfo', BankInfoSchema);
