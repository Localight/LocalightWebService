'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:TextorlistCtrl
 * @description
 * # TextorlistCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('TextorlistCtrl', function ($scope, rotationCheck) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Reset the rotation alert boolean
    rotationCheck.reset();

    //Check if it is ios or android
    $scope.iOS = /iPad|iPhone|iPod/.test(navigator.platform);

  });
