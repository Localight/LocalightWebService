'use strict';

//Setting up route
angular.module('giftcards').config(['$stateProvider',
	function($stateProvider) {
		// Giftcards state routing
		$stateProvider.
		state('listGiftcards', {
			url: '/api/giftcards',
			templateUrl: 'modules/api/giftcards/views/list-giftcards.client.view.html'
		}).
		state('createGiftcard', {
			url: '/api/giftcards/create',
			templateUrl: 'modules/api/giftcards/views/purchaseSequence/create_giftcard_order.client.view.html'
		}).
		state('viewGiftcard', {
			url: '/api/giftcards/:giftcardId',
			templateUrl: 'modules/api/giftcards/views/view-giftcard.client.view.html'
		}).
		state('editGiftcard', {
			url: '/api/giftcards/:giftcardId/edit',
			templateUrl: 'modules/api/giftcards/views/edit-giftcard.client.view.html'
		}).
		state('reviewGiftcard', {
			url: '/review',
			templateUrl: 'modules/api/giftcards/views/purchaseSequence/review_giftcard_order.client.view.html'
		})
		.state('sendGiftcard', {
			url: '/sent',
			templateUrl: 'modules/api/giftcards/views/purchaseSequence/giftcard_sent.client.view.html'
		});
	}
]);
