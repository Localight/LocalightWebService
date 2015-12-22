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
      controller: function ($scope, loadingSpinner, $route) {

          //Initialize the loading service
          $scope.spinner = loadingSpinner.init();


          //Function to refresh the page
          $scope.refresh = function() {

              //Refresh the spinner
              loadingSpinner.reset();

              $route.reload();

          }


      }
    };
  });
