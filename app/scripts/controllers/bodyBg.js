'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:BodybgCtrl
 * @description
 * # BodybgCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('BodyCtrl', function ($scope, $location, $timeout) {

    //Our html tag
    var html = document.documentElement;

    //If the route is the route passed,
    //it will switch the body ng-class
    $scope.isDark = function(route) {

        //Check to also switch our html color here with dark routes
        //Colors should be kept in sync with colors sass
        if($location.path().indexOf(route) > -1) {
            html.backgroundColor = "#316D6B"
        }
        else html.backgroundColor = "#4fcfc8"

      return ($location.path().indexOf(route) > -1);
    }

    //Redirect function for invalid devices
    var invalidDevice = function(){
        window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }

    //Check if this is not a mobile device
    if (navigator.maxTouchPoints <= 1 || navigator.plugins.length > 0) {
      invalidDevice();
    } else if (window.chrome) {
      if (window.chrome.webstore) {
          invalidDevice();
      }
    };

    //Grab the device platform for android/iphone background switching
    //Checking if the platform contains any iphone in it's platform
    //if(navigator.userAgent.indexOf("iPhone") < 0) alert(navigator.userAgent);

    //Set the position of the background to be the device height
    //We want about 60% of the viewport html.clientHeight * .4
    html.style.backgroundPosition = "100% " + (html.clientHeight * .4375) + "px";

    $timeout(function(){
        html.className = html.className + " bgFade";
    }, 100);
  });
