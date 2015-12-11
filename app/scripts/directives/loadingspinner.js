'use strict';

/**
 * @ngdoc directive
 * @name angularLocalightApp.directive:loadingSpinner
 * @description
 * # loadingSpinner
 */
angular.module('angularLocalightApp')
  .directive('loadingSpinner', function () {
    return {
      replace: false,
      restrict: 'E',
      templateUrl: 'views/loadingSpinner.html',
      controller: function ($scope, loadingSpinner) {

          //Initialize the loading service
          $scope.spinner = loadingSpinner.init();


      }
    };
  });
