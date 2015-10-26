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

        //Create the error object
        $scope.error = {
            isError : true,
            text: ""
        };

        //Regex for all valid emails. To add a TLD, edit the final OR statement.
        var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|co|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
        //Test the form email against the regex
        if (!emailRegex.test($scope.email)) {
            $scope.error.text = "Sorry, thats not a valid email.";
        } else {
            //New owner payload
            var payload = {
               "name" : $scope.username,
               "stripeCustomerId" : $scope.stripeCustomerId,
               "email" : $scope.email,
               "password" : $scope.password
            }

            //Show(true)/Hide(false) the loading spinner
            $scope.loading = true;

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


    }
  });
