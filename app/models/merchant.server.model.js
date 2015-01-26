'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Merchant Schema
 */
var MerchantSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Merchant name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Merchant', MerchantSchema);