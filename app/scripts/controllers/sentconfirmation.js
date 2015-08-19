'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:SentconfirmationCtrl
 * @description
 * # SentconfirmationCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('SentconfirmationCtrl', function ($scope, $cookies) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Switch dark overlay off
    document.body.style.backgroundImage = "url('../images/local-street-bg-blur.png')";
    document.body.style.backgroundColor = "#4fcfc8"

    $scope.getInit = function()
    {
        //Place our cookies in scope variables and then remove the cookies
        $scope.phoneNum = $cookies.get("phone");
        $scope.email = $cookies.get("email");

        //Remove the cookies
        $cookies.remove("phone");
        $cookies.remove("email");
    }

  });
