'use strict';

//Setting up route
angular.module('merchants').config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Merchants state routing
		$urlRouterProvider.otherwise('/');

		$stateProvider.
		state('listMerchants', {
			url: '/merchants',
			templateUrl: 'modules/merchants/views/list-merchants.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/merchants/views/create-merchant.client.view.html'
		}).
		state('viewMerchant', {
			url: '/merchants/:merchantId',
			templateUrl: 'modules/merchants/views/view-merchant.client.view.html'
		}).
		state('editMerchant', {
			url: '/merchants/:merchantId/edit',
			templateUrl: 'modules/merchants/views/edit-merchant.client.view.html'
		});
	}
]);
