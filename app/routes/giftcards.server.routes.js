'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var giftcards = require('../../app/controllers/giftcards.server.controller');


	// app.route('/spendAGiftcard')
	// .post(giftcards.spendAGiftcard);
	// Giftcards Routes

	app.route('/giftcards')
		/**
		 * @api{get} /giftcards
		 * @apiName GetGiftcard
		 * @apiGroup Giftcard
		 */
		.get(users.requiresLogin, giftcards.list)//
		/**
		 * @api{post} /giftcards Create A Gift Card
		 * @apiName createGiftCard
		 * @apiGroup Giftcard
		 * @apiParam {Number} amount Mandatory amount of giftcard, must be greater than zero.
		 * @apiParam{String} [occasion] Optional Occasion of the gift card.
		 * @apiParam{String} stripeOrderId Mandatory StripeOrderId
		 * @apiParam{Schema.ObjectId} purchaserOfGiftcard  User Id of the user creating the gift card.
		 * @apiParam{Schema.ObjectId} spenderOfGiftCard User Id of the receiving the giftcard.
		 *
		 */
		.post(users.requiresLogin, giftcards.create);

	app.route('/giftcards/:giftcardId')
		/**
		 * @api{get} /giftcards
		 * @apiName GetGiftcard
		 * @apiGroup Giftcard
		 */
		.get(users.requiresLogin, giftcards.hasAuthorization, giftcards.read)
		.put(giftcards.spendAGiftcard)
		// .put(users.requiresLogin, giftcards.hasAuthorization, giftcards.update)
		//TODO: when you are working on the update method, make sure the program doesn't
		// send emails each time the value is updated.
		/**
		 * @api{get} /giftcards
		 * @apiName GetGiftcard
		 * @apiGroup Giftcard
		 */
		.delete(users.requiresLogin, giftcards.hasAuthorization, giftcards.delete);
		//.post(users.requireLogin, giftcards.hasAuthorization, giftcards.send);// to send a giftcard we need two things.
		// a username(later a phone number) and a giftcard to send.
   	// Finish by binding the Giftcard middleware
	app.param('giftcardId', giftcards.giftcardByID);
	//app.param('giftcardUserName', giftcards.giftcardByUserName);
};
