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
    'ngTouch',
    'duScroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/giftcards/create', {
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
      .when('/sent', {
        templateUrl: 'views/sentconfirmation.html',
        controller: 'SentconfirmationCtrl',
        controllerAs: 'sentConfirmation'
      })
      .when('/panel/signup', {
        templateUrl: 'views/signuppanel.html',
        controller: 'SignuppanelCtrl',
        controllerAs: 'signupPanel'
      })
      .when('/panel/login', {
        templateUrl: 'views/loginpanel.html',
        controller: 'LoginpanelCtrl',
        controllerAs: 'loginPanel'
      })
      .when('/panel/main', {
        templateUrl: 'views/mainpanel.html',
        controller: 'MainpanelCtrl',
        controllerAs: 'mainPanel'
      })
      .when('/panel/createlocation', {
        templateUrl: 'views/createlocation.html',
        controller: 'CreatelocationCtrl',
        controllerAs: 'createlocation'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
