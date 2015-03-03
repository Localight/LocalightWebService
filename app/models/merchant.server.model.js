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
		default: '',
		required: 'Please fill Business Name'
	},
	ein:{
		type:String,
		default: '',
		required: 'Please fill EIN'
	},
	email:{
		type:String,
		default: '',
		required: 'Please fill in Email'
		//TODO: get regular expression from other file.
	},
	phoneNumber:{
		type:String,
		default: '',
		required:'Please fill in Phone Number'
		//could be number or could be string, get regular expression from other file.
	},
	businessAddress:{
		line1:{
			type:String,
			default: '',
		//	required:'Please fill in Street Address'
		},
		line2:{
			type:String,
			default: ''
		},
		city:{
			type:String,
			default: '',
		//	required:'Please fill in City'
		},
		state:{
			type:String,
			default: '',
			//required:'Please fill in State'
		},
		postal_code:{
			type:String,
			default: '',
			//krkekquired:'Please fill in Postal code'
		}
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
		default: ''
	},
	bankAccountTokens:[
		{
			type:String,
			default: ''
		}
	],
	bankAccountConfirmationTokens:[
		{
			type:String,
			default: ''
		}
	],
	transactionTokens:[{
		type:String,
		default: ''
	}],
	dateSignedUp: {
		type: Date,
		default: Date.now
	},
	signedUpBy: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Merchant', MerchantSchema);
