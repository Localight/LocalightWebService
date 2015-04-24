'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Transaction Schema
 */
var TransactionSchema = new Schema({
	/**
	 * This is the id-key of the giftcard that was used in this transaction, since giftcards have no name.
	 * @type {Giftcard}
	 */
	gitftcardId:{
		type: Schema.ObjectId,
		ref: 'Giftcard'
	},
	/**
	 * Net Amount, is the amount before taxes or cuts have been taken out. I leave that up to the bookkeeper for now.
	 * At the time of writing this, we don't have a user admin, or any way to handle manipulation of this data. it's in the works.
	 * @type {Number}
	 */
	netAmount: {
		type:Number,// might need to be string, not sure.
	},
	/**
	 * Merchant Id is the user that the money needs to go to.
	 * @type {User}
	 */
	merchantId: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	/**
	 * Recipient Id is the id of the user who spent the giftcard.
	 * @type {User}
	 */
	recipientId:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	senderId:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	/**
	 * Need to make sure this is accurate to second.
	 * @type {Date}
	 */
	created: {
		type: Date,
		default: Date.now
	},
});

mongoose.model('Transaction', TransactionSchema);
