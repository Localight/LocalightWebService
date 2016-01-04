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
      templateUrl: 'views/loadingSpinner.html',
      controller: function ($scope, rotationCheck) {

        element.text('this is the rotationAlert directive');
      }
    };
  });
