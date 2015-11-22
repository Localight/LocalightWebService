'use strict';

/**
 * @ngdoc directive
 * @name angularLocalightApp.directive:touching
 * @description
 * # touching
 */

angular.module('angularLocalightApp')
.directive('myTouchstart', ['$parse', function($parse) {
      return function(scope, element, attr) {

         //Grab our event
         var touchEvent = $parse(attr.myTouchstart);
          element.on('touchstart', function(event) {
              scope.$apply(function() {
                  touchEvent(scope, {$event: event});
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
}).directive('myTouchend', ['$parse', function($parse) {
      return function(scope, element, attr) {

          //Grab our event
          var touchEvent = $parse(attr.myTouchend);
          element.on('touchend', function(event) {
              scope.$apply(function() {
                  touchEvent(scope, {$event: event});
              });
          });
      };
  }]);
