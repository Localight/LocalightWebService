'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:BodybgCtrl
 * @description
 * # BodybgCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('BodyCtrl', function ($scope, $location) {

      //Fucntion to find the active page
      $scope.isDark = function(route) {
          return route === $location.path();
    }

  });
