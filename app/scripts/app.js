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
    'duScroll',
    'envConfig',
    'angular-datepicker'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/giftcards/create', {
        templateUrl: 'views/giftCreate.html',
        controller: 'CreategiftcardCtrl',
        controllerAs: 'createGiftcard'
      })
      .when('/giftcards', {
        templateUrl: 'views/giftList.html',
        controller: 'ListgiftcardsCtrl',
        controllerAs: 'listGiftcards'
      })
      .when('/giftcards/:giftcardId', {
        templateUrl: 'views/giftView.html',
        controller: 'ViewgiftcardCtrl',
        controllerAs: 'viewGiftcard'
      })
      .when('/merchants', {
        templateUrl: 'views/merchants.html',
        controller: 'MerchantsCtrl',
        controllerAs: 'merchants'
      })
      .when('/merchants/:merchantId/amount', {
        templateUrl: 'views/enterAmount.html',
        controller: 'EnterAmountCtrl',
        controllerAs: 'enterAmount'
      })
      .when('/merchants/:merchantId/tilt', {
        templateUrl: 'views/tiltScreen.html',
        controller: 'TiltScreenCtrl',
        controllerAs: 'tiltScreen'
      })
      .when('/merchants/:merchantId/tricon', {
        templateUrl: 'views/tricon.html',
        controller: 'TriconCtrl',
        controllerAs: 'tricon'
      })
      .when('/merchants/:merchantId/confirmation', {
        templateUrl: 'views/confirmTimeout.html',
        controller: 'ConfirmationTimeoutCtrl',
        controllerAs: 'confirmationTimeout'
      })
      .when('/merchants/:merchantId/thankyou', {
        templateUrl: 'views/thankYou.html',
        controller: 'ThankyouCtrl',
        controllerAs: 'thankyou'
      })
      .when('/localism', {
        templateUrl: 'views/localism.html',
        controller: 'LocalismCtrl',
        controllerAs: 'localism'
      })
      .when('/sent', {
        templateUrl: 'views/confirmSent.html',
        controller: 'SentconfirmationCtrl',
        controllerAs: 'sentConfirmation'
      })
      .when('/dashboard/signup', {
        templateUrl: 'views/dashboard/dashSignup.html',
        controller: 'SignuppanelCtrl',
        controllerAs: 'signupPanel'
      })
      .when('/dashboard/login', {
        templateUrl: 'views/dashboard/dashLogin.html',
        controller: 'LoginpanelCtrl',
        controllerAs: 'loginPanel'
      })
      .when('/dashboard/main', {
        templateUrl: 'views/dashboard/dashList.html',
        controller: 'MainpanelCtrl',
        controllerAs: 'mainPanel'
      })
      .when('/dashboard/createlocation', {
        templateUrl: 'views/dashboard/locationCreate.html',
        controller: 'CreatelocationCtrl',
        controllerAs: 'createlocation'
      })
      .when('/dashboard/editlocation/:locationId', {
        templateUrl: 'views/dashboard/locationEdit.html',
        controller: 'EditlocationCtrl',
        controllerAs: 'editlocation'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard/dashHome.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/followUp', {
        templateUrl: 'views/followup.html',
        controller: 'FollowupCtrl',
        controllerAs: 'followUp'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
