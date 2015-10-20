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

      //If the route is the route passed, it will switch the body ng-class
      $scope.isDark = function(route) {
          return ($location.path().indexOf(route) > -1);
    }

  });
