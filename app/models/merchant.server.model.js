
'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;
// var validate = require('mongoose-validator');
// need to work on the validations.
// get help with validator and move on.
// what we will use validators for, make sure numbers are correct, and lengths are the right size.
// var nameValidator = [
// 	validate({
// 		validator: 'isLength',
// 		arguments: [5, 20],
// 		message: 'Name should be between 3 and 20 characters'
// 	}),
// 	validate({
// 		validator: 'isAlphanumeric',
// 		passIfEmpty: true,
// 		message: 'Name should contain alpha-numeric characters only'
// 	}),
// ];
/**
* Merchant Schema
*/
var MerchantSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},

	basicOwnerInfo:{
		ownerFirstName:{
			type:String,
			required: 'First Name of owner required',
			// validate:'nameValidator'
		},
		ownerLastName:{
			type:String,
			maxLength:20,
			required: 'Last Name of owner required'
		},
		ownerPhoneNumber:{
			type:Number,
			max: 10,
			required:'Phone Number of owner required'
		},
		ownerEmailAddress:{
			type:String,
			maxLength: 20,
			match: [/.+\@.+\..+/, 'Please fill a valid email address']
		}
	},
	 businessInfo:{
	 	legalCompanyName:{
	 		type:String,
			max: 20,
	 		required: 'company name required'
	 	},
	 	companyWebsite:{
	 		type:String,
	 	}
	 	//TODO: come back and work on address, I remember Address being tricky.
	 },
	// for testing purpose only:
		bankPayoutInfo:{
			accountNumber:{
				type:Number,
				required:'please fill in account number'
			},
			routingNumber:{
				type:Number,
				required:'please fill in routing number'
			}
		},
		// need to figu
		 	kickbackSplit : [{
		 		merchant: String,
		 		percentage: Number
			}]
	// TODO: when working with the routing and account numbers, be sure the forms validate.
});
// want to make sure that phonenumber is unique in database,
/**
* Find possible not used username
*/

//TODO: write method to validate that phonenumber is unique in database.
// MerchantSchema.statics.findUniquePhoneNumber = function(phoneNumber, suffix, callback) {
// 	var _this = this;// I don't understand this line.
//
// 	var possiblePhoneNumber = phoneNumber + (suffix || '');// interesting a conditional in a assignment
//
// 	_this.findOne({
// 		phoneNumber: possiblePhoneNumber
// 	}, function(err, merchant) {
// 		if (!err) {
// 			if (!merchant) {
// 				callback(possiblePhoneNumber);
// 			} else {
// 				return _this.findUniquePhoneNumber(phoneNumber, (suffix || 0) + 1, callback);
// 			}
// 		} else {
// 			callback(null);
// 		}
// 	});
// };
module.exports = mongoose.model('Merchant', MerchantSchema);

	// 	address: String,// come back too.
	// 	phoneNumber: Number,
	// 	website: String,
	// 	},
	// bankPayoutInfo: {
	// 	legalCompanyName:{
	// 		type: String,
	// 	//	default: '',
	// 	//	validate: [validateLocalStrategyProperty, 'Please fill in your legal company name']
	// 	},
	// 	// this needs to be turned into a token, and can't store the actual bank account info.
	// 	// need to store the token balance, look at balanced. so you can call the last 4 of a credit card.
	// 	// PCI Complient
	// 	routingNumber:{
	// 		type: Number,
	// 		//default: '',
	// 	//	validate: [validateLocalStrategyProperty, 'Please fill in your routing number']
	// 	},
	// 	accountNumber:{
	// 		type: Number,
	// 	//	default: '',
	// 	//	validate: [validateLocalStrategyProperty, 'Please fill in your account number']
	// 	}},  // routing number? account number?
	// locations: {
	// 	basicInfo: {
	// 		address: String,
	// 		phoneNumber: Number,
	// 		website: String
	// 	},
	// 	manager: String,
	// 	account: String,
	// 	tricons: String,
	//
	// 	kickbackSplit : [{
	// 		merchant: String,
	// 		percentage: Number
	// 	}],
	// 	// add in contract percent
	// 	clerks: [{
	// 		name: String
	// 	}],
	// I think transactions should be a separte schema

	// 	transactions: [{
	// 		amountSpent: Number,
	// 		timestamp: {
	// 			type: Date,
	// 			default: Date.now
	// 		},
	// 	}]
	// }
