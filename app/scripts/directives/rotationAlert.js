'use strict';

/**
 * @ngdoc directive
 * @name angularLocalightApp.directive:rotationAlert
 * @description
 * # rotationAlert
 */
angular.module('angularLocalightApp')
  .directive('rotationAlert', function () {
    return {
      replace: false,
      restrict: 'E',
      templateUrl: 'views/rotationAlert.html',
      controller: function ($scope, $window) {

          //Boolean to alert rotation to the user
          $scope.rotateAlert = false;
          $scope.closedAlert = false;

          //Check for device orientation
          $window.addEventListener("orientationchange", function() {
              if(!$scope.rotateAlert && !$scope.closedAlert && ($window.orientation == -90 || $window.orientation == 90))
              {
                  $scope.rotateAlert = true;
                  $scope.$apply();
              }
          }, false);

          //Check for route change
          $scope.$on('$locationChangeStart', function(event) {
              //Reset the alert variables
              $scope.rotateAlert = false;
              $scope.closedAlert = false;
          });

          //Function to close the alert
          $scope.closeAlert = function () {
              $scope.closedAlert = true;
              $scope.rotateAlert = false;
          }


      }
    };
  });
