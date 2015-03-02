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
	business_name:{
		type:String,
	},
	ein:{
		type:String,
	},
	email:{
		type:String,
		//TODO: get regular expression from other file.
	},
	phoneNumber:{
		type:String,
		//could be number or could be string, get regular expression from other file.
	},
	businessAddress:{
		line1:{
			type:String,
		},
		line2:{
			type:String,
		},
		city:{
			type:String,
		},
		state:{
			type:String,
		},
	},
	/**
	* BANKING INFORMATION
	* Default set to empty so they can never actually be filled and put into the database.
	*/
	accountNumber:{
		type:String,
		default: ''
	},
	routingNumber:{
		type:String,
		default: '',
	},
	/**
	* BALANCED API STUFF
	* Default set to empty so they can never actually be filled and put into the database.
	*/
	customerToken:{
		type:String,
	},
	bankAccountTokens:[
		{
			type:String
		}
	],
	bankAccountConfirmationTokens:[
		{
			type:String,
		}
	],
	transactionTokens:[{
		type:String
	}],
	




	dateSignedUp: {
		type: Date,
		default: Date.now
	},
	signUpBy: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Merchant', MerchantSchema);
