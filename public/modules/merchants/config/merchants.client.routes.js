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
			url: '/',//need to come back to this.
			templateUrl: 'modules/merchants/views/signup-basicinfo-merchant.client.view.html'
		}).
		state('confirmation',{
			url:'/confirmation',
			templateUrl:'modules/merchants/views/confirmation-merchant.client.view.html'
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
