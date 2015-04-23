'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Transaction Schema
 * Any time a giftcard gets used or updated, a transaction is created.
 */
var TransactionSchema = new Schema({
	/*
   * The Name of the person to send this giftcard too.
   */
  giftRecipientFirstName: {
    type: String,
    // should have spaces to indcate first name and last name.
    // TODO: add regualer expressions.
    required: 'Please enter the recipients name.'
  },

  /**
   * Amount, the value of which the card holds, to be spent at a merchant's busienss.
   * @type {Object}
   */
  amount: {
    type: Number,
    required: 'Please enter an amount to purchase.'
  },
  /**
   * [receiptEmail description]
   * @type {Object}
   */
   emailForReceipt:{
    type:String,
    required:'please enter a email',
  },
  giftSenderFirstName:{
    type:String,
  },
  /*
   * Crucial part, we need a mobile number to send the giftcard too. this is a primary key.
   * it also gives us the means to verify this users phone.
   */
  mobileNumberOfRecipient: {
    type: Number,
    required: 'Please enter the recipients phone number',
    //TODO: enter in regular expression, and make sure no spaces.
  },
  stripeCardToken: {
    type: String
  },
  /**
   * [stripeOrderId Provided everytime a gifcard is object, will for user to be refunded.]
   * @type {String}
   */
  stripeOrderId: {
    type: String,
    required: 'You must save the order Id.'
  },


  // Date card created or purchased, might want to change the number.
  dateTransactionCreated: {
    type: Date,
    default: Date.now
  },
	//TODO: add tricon and any other identification stuff.

  merchant: {
    type: Schema.ObjectId,
    ref: 'Merchant'
  },
  fromUser: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Enter who this is from.'
  },
  toUser: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Please Enter a User to send this too.'
  },
});

mongoose.model('Transaction', TransactionSchema);
