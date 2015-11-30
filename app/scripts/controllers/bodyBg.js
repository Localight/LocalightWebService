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

    //Our backGround tag
    var html = document.documentElement;
    var backGround = document.getElementById("localCity");

    //If the route is the route passed,
    //it will switch the body ng-class
    $scope.isDark = function(route) {
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

    //Set the position of the background to be the device height
    //We want about 60% of the viewport backGround.clientHeight * .4(ish)
    backGround.style.backgroundPosition = "100% " + (html.clientHeight * .3725) + "px";

    $timeout(function(){
        backGround.className = backGround.className + " bgFade";
    }, 100);
  });
