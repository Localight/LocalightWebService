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
    $scope.submitError;

    //Sign up our owner!
    $scope.signUp = function() {

        //First check if their passwords match
        if($scope.password.indexOf($scope.confirmPassword) < 0)
        {
            console.log("hi");
            $scope.submitError = true;
            $scope.theError = "Passwords do not match!";
            return;
        }

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
            else
            {
                //there was no error continue as normal
                //Save their session token
                $cookies.put("sessionToken", $scope.owner.token);

                //Finally redirect to the main page
                $location.path("/panel/main");
            }
        },
        //check for errors
        function(response)
        {
            //Create the error object
            $scope.error = {
                isError : true,
                text: ""
            };

            if(response.status == 401)
            {
                $scope.error.text = "Sorry, the entered account information is incorrect.";
            }
            else {
                $scope.error.text = "Sorry, an error has occured connecting to the database";
            }
        }
        );

    }

  });
