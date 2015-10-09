'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:LoginpanelCtrl
 * @description
 * # LoginpanelCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('LoginpanelCtrl', function ($scope, $cookies, $location, LoginOwner) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //no errors
    $scope.submitError;

    //Sign up our owner!
    $scope.login = function() {

        //First set up some JSON for the session token
        var postJson = {
           "email" : $scope.email,
           "password" : $scope.password
        }

        $scope.owner = LoginOwner.submit(postJson, function(){
                //there was no error continue as normal
                //Save their session token
                $cookies.put("sessionToken", $scope.owner.token);

                //Finally redirect to the main page
                $location.path("/panel/main");
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
            });
        }

  });
