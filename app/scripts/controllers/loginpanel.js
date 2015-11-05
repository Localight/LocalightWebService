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

    //Boolean to show an error to the user
    $scope.submitError;

    //Log in our owner!
    $scope.login = function() {

        //Show(true)/Hide(false) the loading spinner
        $scope.loading = true;


        //First set up some JSON for the session token
        var payload = {
           "email" : $scope.email,
           "password" : $scope.password
        }

        //Login the user, submit the payload to the backend
        LoginOwner.submit(payload,
        function(data, status) {

            //Success, save the response in scope
            $scope.owner = data;

            //Save their session token
            $cookies.put("sessionToken", $scope.owner.token);

            //Finally redirect to the main page
            $location.path("/dashboard/main");

            //Show(true)/Hide(false) the loading spinner
            $scope.loading = false;
        },
        function(err) {
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
