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
      .when('/merchants/:merchantId/tilt', {
        templateUrl: 'views/tilt-screen.html',
        controller: 'TiltScreenCtrl',
        controllerAs: 'tiltScreen'
      })
      .when('/merchants/:merchantId/tricon', {
        templateUrl: 'views/tricon.html',
        controller: 'TriconCtrl',
        controllerAs: 'tricon'
      })
      .when('/merchants/:merchantId/confirmation', {
        templateUrl: 'views/confirmation-timeout.html',
        controller: 'ConfirmationTimeoutCtrl',
        controllerAs: 'confirmationTimeout'
      })
      .when('/merchants/:merchantId/thankyou', {
        templateUrl: 'views/thankyou.html',
        controller: 'ThankyouCtrl',
        controllerAs: 'thankyou'
      })
      .when('/localism', {
        templateUrl: 'views/localism.html',
        controller: 'LocalismCtrl',
        controllerAs: 'localism'
      })
      .when('/recipientRedirect', {
        templateUrl: 'views/recipientredirect.html',
        controller: 'RecipientredirectCtrl',
        controllerAs: 'recipientRedirect'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
