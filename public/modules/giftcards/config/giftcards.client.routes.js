'use strict';

//Setting up route
angular.module('giftcards').config(['$stateProvider',
	function($stateProvider) {
		// Giftcards state routing
		$stateProvider.
		state('listGiftcards', {
			controller: 'ListGiftCardsController',
			url: '/giftcards',
			templateUrl: 'modules/giftcards/views/list-giftcards.client.view.html'
		}).
		state('createGiftcard', {
			url: '/giftcards/create',
			templateUrl: 'modules/giftcards/views/purchaseSequence/create_giftcard_order.client.view.html'
		}).
		state('viewGiftcard', {
			url: '/giftcards/:giftcardId',
			templateUrl: 'modules/giftcards/views/spendingSequence/recipient.html'
		}).
		state('editGiftcard', {
			url: '/giftcards/:giftcardId/edit',
			templateUrl: 'modules/giftcards/views/edit-giftcard.client.view.html'
		});
		// state('reviewGiftcard', {
		// 	url: '/review',
		// 	templateUrl: 'modules/giftcards/views/purchaseSequence/review_giftcard_order.client.view.html'
		// })
		// .state('sendGiftcard', {
		// 	url: '/sent',
		// 	templateUrl: 'modules/giftcards/views/purchaseSequence/giftcard_sent.client.view.html'
		// });
	}
]);
