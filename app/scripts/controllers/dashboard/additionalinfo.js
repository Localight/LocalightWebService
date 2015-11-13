'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:AdditionalinfoCtrl
 * @description
 * # AdditionalinfoCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('AdditionalinfoCtrl', function ($scope, $cookies, $location, $timeout, Owners, loadingSpinner) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Initialize the loading service
    $scope.loadHandler = loadingSpinner.loading;
    $scope.errorHandler = loadingSpinner.error;

    //Grab our session token from the cookies
    var sessionToken = $cookies.get("sessionToken");

    //Update the owner
    $scope.updateOwner = function() {

        //Start loading
        var loadRequest = loadingSpinner.load("Updating your account...");

        //Create the payload
        var payload = {
            token : sessionToken,
            dob: $scope.formData.dob
        };

        //Send the payload to update the owner
        Owners.update(payload, function(data, status) {

            //Everything is good, redirect to the location create page
            $location.path("/dashboard/createlocation");

            //Stop Loading
            loadingSpinner.stopLoading(loadRequest);
        }, function(err) {

            //Create the error object
            $scope.error = {
                isError : true,
                text: ""
            };

            //Error, Inform the user of the status
            if (err.status == 401) {
               //Session is invalid! Redirect to 404
               $scope.error.text = "Sorry, your sessiont token is not valid, please log in again";
            } else {
               //An unexpected error has occured, inform user, log into console
               console.log("Status: " + err.status + " " + err.data.msg);
               $scope.error.text = "Sorry, an error has occured connecting to the database";
            }

            //Stop Loading
            loadingSpinner.stopLoading(loadRequest);
        });
    }


  });
