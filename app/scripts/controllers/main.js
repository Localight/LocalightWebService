'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('MainCtrl', function ($scope) {

      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      //Check if it is ios or android
      $scope.iOS = /iPad|iPhone|iPod/.test(navigator.platform);
  });
