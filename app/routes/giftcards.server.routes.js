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
		 * @api{get} /giftcards
		 * @apiName GetGiftcard
		 * @apiGroup Giftcard
		 */
		.post(users.requiresLogin, giftcards.create);

	app.route('/giftcards/:giftcardId')
		/**
		 * @api{get} /giftcards
		 * @apiName GetGiftcard
		 * @apiGroup Giftcard
		 */
		.get(users.requiresLogin, giftcards.hasAuthorization, giftcards.read)
		/**
		 * @api{get} /giftcards
		 * @apiName GetGiftcard
		 * @apiGroup Giftcard
		 */
		.put(users.requiresLogin, giftcards.hasAuthorization, giftcards.update)
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
