
'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;


/**
* A Validation function for local strategy properties
*/
// I want to know what this is for and how it works.
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

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
			maxLength: 20,
			required: 'First Name of owner required'
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
	 	//TODO: come back and work on address, I remember Address being tricky
	 },
		bankPayoutInfo:{
			accountNumber:{
				type:Number,
				required:'please fill in account number'
			},
			routingNumber:{
				type:Number,
				required:'please fill in routing number'
			}
		}
	// for testing purpose only:
	// TODO: when working with the routing and account numbers, be sure the forms validate.
});
module.exports = mongoose.model('Merchant', MerchantSchema);

	// generalManagerFirstName: String,
	// generalManagerLastname: String,
//	basicInfo: {
	// 	ownerFirstName:{
	// 		type: String,
	// 		// trim: true,
	// 		// required: 'First Name is required'
	// 	//	default: '',
	// 	//	validate: [validateLocalStrategyProperty, 'Please fill in your first name']
	// 	},
	// 	ownerLastName:{
	// 		type: String,
	// 		//trim: true,
	// 	//	default: '',
	// 	//	validate: [validateLocalStrategyProperty, 'Please fill in your last name']
	// 	},
	// 	// Legal Company Name could be a Unqiue thing.
	// 	storeFrontName:{
	// 		type: String,
	// 		//trim: true,
	// 	//	default: '',
	// 	//	validate: [validateLocalStrategyProperty, 'Please fill in your store Front Name']
	// 	},
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
	// 	transactions: [{
	// 		amountSpent: Number,
	// 		timestamp: {
	// 			type: Date,
	// 			default: Date.now
	// 		},
	// 	}]
	// }
