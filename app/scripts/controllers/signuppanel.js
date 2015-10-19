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

    //Boolean for if we receive errors
    $scope.submitError;

    //Sign up our owner!
    $scope.signUp = function() {

        //First check if their passwords match
        if($scope.password.indexOf($scope.confirmPassword) < 0)
        {
            $scope.submitError = true;
            $scope.theError = "Passwords do not match!";
            return;
        }

        //Show(true)/Hide(false) the loading spinner
        $scope.loading = true;

        //First set up some JSON for the session token
        var payload = {
           "name" : $scope.username,
           "stripeCustomerId" : $scope.stripeCustomerId,
           "email" : $scope.email,
           "password" : $scope.password
        }

        JoinOwner.submit(payload,
        function(data, status){

            //Success, save the response from the backend
            $scope.owner = data;

            //Save their session token
            $cookies.put("sessionToken", $scope.owner.token);

            //Finally redirect to the main page
            $location.path("/panel/main");

            //Show(true)/Hide(false) the loading spinner
            $scope.loading = false;
        },
        function(err)
        {
            //Create the error object
            $scope.error = {
                isError : true,
                text: ""
            };

            if(err.status == 401)
            {
                $scope.error.text = "Sorry, the entered account information is incorrect.";
            }
            else {
                $scope.error.text = "Sorry, an error has occured connecting to the database";
            }

            //Show(true)/Hide(false) the loading spinner
            $scope.loading = false;
        });
    }
  });
