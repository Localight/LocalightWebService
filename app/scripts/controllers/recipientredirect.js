'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:RecipientredirectCtrl
 * @description
 * # RecipientredirectCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('RecipientredirectCtrl', function ($location, $routeParams, $cookies, $timeout) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Get the session token and save it
    var sessionToken = $routeParams.token;

    $cookies.put("sessionToken", sessionToken);

    //Timeout to the next page
    $timeout(timeoutRedirect, 2000);

    //Redirect to the thank you page
    function timeoutRedirect()
    {
        $location.path("/giftcards");
    }


  });
