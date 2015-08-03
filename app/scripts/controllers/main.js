'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('MainCtrl', function ($window) {
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
  });
