'use strict';

/**
 * @ngdoc directive
 * @name angularLocalightApp.directive:touching
 * @description
 * # touching
 */

angular.module('angularLocalightApp')
.directive('myTouchstart', [function() {
      return function(scope, element, attr) {
          element.on('touchstart', function(event) {
              scope.$apply(function() {
                  scope.$eval(attr.myTouchstart);
              });
          });
      };
  }]).directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus,
      function (newValue) {
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };
}).directive('myTouchend', [function() {
      return function(scope, element, attr) {

          element.on('touchend', function(event) {
              scope.$apply(function() {
                  scope.$eval(attr.myTouchend);
              });
          });
      };
  }]);
