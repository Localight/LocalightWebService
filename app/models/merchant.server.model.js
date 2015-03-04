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
	first_name: {
		type: String,
		default: '',
		required: 'Please fill Merchant first name',
		trim: true

		//TODO: 
	},
	last_name: {
		type: String,
		default: '',
		required: 'Please fill Merchant last name',
		trim: true
	},
	business_name:{
		type:String,
		default: '',
		required: 'Please fill Business Name',
		match : [ [a-z]{3,50}, "please fill out business name"]
		//TODO: all strings should be all lowercase before saving
	},
	shortname:{
		type:String,
		default: '',
		required: 'Please fill Business Name',
		match: [ [a-z]{3,18}, "please fill out a short name between 3 and 18 charcters"]
	},
	locationNumber:{
		type:Number,
		default '',
		required: 'Please fill out location number'
	},
	ein:{
		type:String,
		default: '',
		required: 'Please fill EIN', //9 digits
		match: [/d{9}, 'please']
	},
	email:{
		type:String,
		default: '',
		required: 'Please fill in Email',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
		//TODO: get regular expression from other file.
	},
	
	//TODO: add an array of types for merchant model (and a front end menu to select out of the 9 options)
	// type:[
	// 	{
	// 		type: String,
	// 		default: '',
	// 	}
	// 	required: 'Please select type',
	// ],
	phoneNumber:{
		type:String,
		default: '',
		required:'Please fill in Phone Number',
		match:[/d{10}, 'Please fill in a valid Phone Number (10 digits)'];
		//could be number or could be string, get regular expression from other file.
		//TODO: make sure that the phonenumber has no spaces or hyphens
		//phone number of whoever is responsible for the bank account
	},
	locationPhoneNumber:{
		type:String,
		default: '',
		required:'Please fill in Phone Number',
		match:[/d{10}, 'Please fill in a valid Phone Number (10 digits)'];
		//could be number or could be string, get regular expression from other file.
		//TODO: make sure that the phonenumber has no spaces or hyphens
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
		
		//never save account number
		//4 17
	},
	routingNumber:{
		type:String,
		default: '',
		match:[/d{9}, 'Please fill in a valid routing number'];
		//9 digits
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
