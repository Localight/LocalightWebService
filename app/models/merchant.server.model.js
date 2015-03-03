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
		//default: ''
	},
	routingNumber:{
		type:String,
		//default: '',
	},
	/**
	* BALANCED API STUFF
	* Default set to empty so they can never actually be filled and put into the database.
	*/
	balancedStuff:{
		// the token we recive from balanced in place of the informaiton we sent.
		customerTokenThing:{
			type:String,
			default: ''
		},
		// the account and routing number we sent to balanced to be tokenized.
		// we have removed the sensitive informaiton and essentially encrypted it.
		bankAccountTokenThing:{// in theory could actually have more than one bank account and bank account token.
			type:String,//TODO: make this an array. or types.
			default: ''// this could also contain any other infromation regarding the
			// bank account.
		},
		// for every bank account added we must confirm the bank account belongs to the correct
		// owner. each confirmation is assoicate with a bank account.
		bankAccountConfirmationTokenThing:{// TODO: come back and make this an array.
			type:String,
			default: ''
		},
		// for every confirmaiton token the owner of the bank account has 3 attempts.
		// after 3 attempts the token is invalidateded and the user must repeat
		// the whole sequence again. that's what balanced says at least.
		attempts:{
			// max 3 at a time. maybe add a flag to state whether it is
			// inproces or !inprocess
			type:Number
		},
		attempts_remaining:{
			type:Number
			// again another thing we can recieve from balancd.
			// each time the user attempts to enter bank information we could.
			// store that info.
		},
		verificationStatus:{
			type:String
			// this is one is actually important, and we should keep track of what it is from balanced.
		},
	transactionTokens:[{
		type:String,
		default: ''
	}],
	},
	// this is the date the merchant was signed up by the given amassador.
	dateSignedUp:{
		type: Date,
		default: Date.now
	},
	// obviously a user object.
	user:{
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Merchant', MerchantSchema);
