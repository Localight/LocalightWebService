'use strict';
// I want to change gift card to CliqueCard, will do that later though.
// I can do that in a night.
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Giftcard Schema
 */
var GiftcardSchema = new Schema({
	// name: {
	// 	type: String,
	// 	default: '',
	// 	required: 'Please fill Giftcard name',
	// 	trim: true
	// },
	// this is currently the information stored from the clique giftcard in the persona of clique_1
	// typeOfCard: String, // purchased or received
  //   issueDate: { type: Date, default: Date.now },
  //   activationDate: String,
  //   districtNumber: String,
  //   keyword: String,
  //   uniqueLink: String,
  //   status: String,
  //   amount: String,
  //   giftRecipient: String,
  //   giftBuyer: String,
  //   occassion: String,
  //   cliqueCardCode: String,
  //   mobileNumber: String,
  //   cliqueId: String,
  //   test: String
	cardToken:{
		type:String,
		default: ''
	},
	/**
	 * Amount, the value of which the card holds, to be spent at a merchant's busienss.
	 */
	amount:{
		type:Number,
		required:'Please enter an amount to purchase.'
	},
	/**
	 *  Message, the message that the user wishes for another user to see.
	 *  a message doesn't need to have a string attached to it.
	 */
	message:{
		type:String,
		default:''
	},
	/**
	 *  toUserPhoneNumber, the phone number of the giftcard receiver. so we can send it threw text.
	 *  in order for a gift to get made it must have a number of someone to send it too. that number for testing purpose could also be a username.
	 *  for now the user userPhonNumber is going to be toUserName, so I can test his mechanism immediataly.
	 *
	 */
	toUserUserName:{
		type:String,
		default:'',
		required:'Please enter someone to send this too.'
	},
	// toUserPhoneNumber:{
	// 	type:String // might have to be a number not sure yet.
	//
	// },
	/**
	 *  fromUserEmail, the email of the user who wishes to receive the reciept.
	 */
	// maybe "use" date?
	// activationDate:{
	// 	type: Date,
	// 	default: Date.now
	// },
	// District Number, need to come back and enter.
	// status

	// Date card created or purchased, might want to change the number.
	created: {
		type: Date,
		default: Date.now
	},
	// typeOfCard: {
	// 	type:String
	// },
	districtNumber:{
		type:String,
		required:'{lease enter a district number for this giftcard',
		//TODO: make sure district number matches a specific pattern.
	},
	//TODO: add the user who purchased the card,
	//TODO: add the user who it is going to be sent to.
	//TODO: think if the user is sending a giftcard to someone who isn't a in the database, it needs to sign that person up,
	// the amount still needs to get charged, but that person needs to know who they sent it too.
	// this is mostly for testing.
	//TODO: figure out how to save use any amount with the user doesn't care what merchant value they spend at.
	// for now jsut assume a gift card can only be used at one merchant store.
	// merchantGiftCard:{
	// 	type: Schema.ObjectId,
	// 	ref: 'Merchant'
	// 	// required: 'please select a merchant to spend this at.'
	// },
	/*
	* USER BIND
	* until the User B accepts the card, show that the gift card is still owned by user A
	*/
	// Bind to User who Purchasesd the GiftCard
	user: {// this is how the object is stored when it is created.
		type: Schema.ObjectId,
		ref: 'User'
	},
	// fromUser: {
	// 	type:Schema.ObjectId,
	// 	ref:'User',
	// },
	// toUser:{
	// 	type:Schema.ObjectId,
	// 	ref:'User'
	// }
});

mongoose.model('Giftcard', GiftcardSchema);
