'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('MainCtrl', function ($scope, rotationCheck) {
      //Reset the rotation alert boolean
      rotationCheck.reset();
  });
