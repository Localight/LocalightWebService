'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:RecipientredirectCtrl
 * @description
 * # RecipientredirectCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('RecipientredirectCtrl', function ($location, $routeParams, $cookies, $timeout, $window, $scope) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Boolean for alert
    $scope.rotateAlert = false;

    //Check for device orientation
    $window.addEventListener("orientationchange", function() {
        if(!$scope.rotateAlert && ($window.orientation == -90 || $window.orientation == 90))
        {
            $scope.rotateAlert = true;
            alert("Please disable device rotation, this application is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
        }
    }, false);

    //Switch overlay off
    document.getElementById('darkerOverlay').style.display = "none";

    //Make the background blurred
    setTimeout(function () {
        document.getElementById("localStreetNoBlur").className = "localStreet blur";
    }, 750);

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
