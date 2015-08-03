'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:RecipientredirectCtrl
 * @description
 * # RecipientredirectCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('RecipientredirectCtrl', function ($location, $routeParams, $cookies, $timeout, $window) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Check for device orientation
    $window.addEventListener("orientationchange", function() {
        if($window.orientation == -90 || $window.orientation == 90)
        {
            alert("Please disable device rotation, this app is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
        }
    }, false);

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
