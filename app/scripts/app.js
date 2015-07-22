'use strict';

/**
 * @ngdoc overview
 * @name angularLocalightApp
 * @description
 * # angularLocalightApp
 *
 * Main module of the application.
 */
angular
  .module('angularLocalightApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/giftcards/create/:token', {
        templateUrl: 'views/creategiftcard.html',
        controller: 'CreategiftcardCtrl',
        controllerAs: 'createGiftcard'
      })
      .when('/giftcards', {
        templateUrl: 'views/listgiftcards.html',
        controller: 'ListgiftcardsCtrl',
        controllerAs: 'listGiftcards'
      })
      .when('/giftcards/:giftcardId', {
        templateUrl: 'views/viewgiftcard.html',
        controller: 'ViewgiftcardCtrl',
        controllerAs: 'viewGiftcard'
      })
      .when('/merchants', {
        templateUrl: 'views/merchants.html',
        controller: 'MerchantsCtrl',
        controllerAs: 'merchants'
      })
      .when('/merchants/:merchantId/amount', {
        templateUrl: 'views/enter-amount.html',
        controller: 'EnterAmountCtrl',
        controllerAs: 'enterAmount'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
