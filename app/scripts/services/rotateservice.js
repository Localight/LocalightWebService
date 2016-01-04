'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.rotateService
 * @description
 * # rotateService
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .service('rotationCheck', function ($window) {

      //Boolean to alert rotation to the user
      var rotateAlert = false;

      //Check for device orientation
      $window.addEventListener("orientationchange", function() {
          if(!rotateAlert && ($window.orientation == -90 || $window.orientation == 90))
          {
              rotateAlert = true;
          }
      }, false);

      return {

          //Function to reset the alert
          reset: function () {
              //Reset the Boolean
              rotateAlert = false;
          },

          //function to return the rotateAlert
          status: function () {
              //Return the Boolean
              return rotateAlert;
          }
      }
  });
