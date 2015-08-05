'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:SignuppanelCtrl
 * @description
 * # SignuppanelCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('SignuppanelCtrl', function ($scope, $cookies, $location, JoinOwner) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //no errors
    $scope.submitError = false;

    //Sign up our owner!
    //Get our location
    $scope.signUp = function() {
        //Get our giftcards from the user
        //First set up some JSON for the session token
        var postJson = {
            "name" : $scope.username,
           "stripeCustomerId" : $scope.stripeCustomerId,
           "email" : $scope.email,
           "password" : $scope.password
        }

        $scope.owner = JoinOwner.submit(postJson, function(){
            //Check for errors
            if($scope.owner.errorid)
            {
                $scope.submitError = true;
                $scope.theError = $scope.owner.msg;
                return;
            }
            else {
                //there was no error continue as normal
                //Save their session token
                $cookies.put("sessionToken", $scope.owner.sessionToken);
                //log the session token
                console.log($scope.owner.sessionToken);

                //Finally redirect to the main page
                $location.path("/panel/main");
            }
        });

    }

  });
