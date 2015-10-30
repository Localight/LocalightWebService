'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:MainpanelCtrl
 * @description
 * # MainpanelCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('MainpanelCtrl', function ($scope, $cookies, $location, Owners, LocationByOwner) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Grab our session token from the cookies
    var sessionToken = $cookies.get("sessionToken");

    //Get our owner info on page load
    $scope.getOwner = function() {

        //First set up some JSON for the session token
        var payload = {
           "sessionToken" : sessionToken
        }

        Owners.get(payload,
        function(data, status){

            //Success, save the data to scope
            $scope.owner = data;

            //Get the locations
            $scope.getLocations();
        },
        //check for errors
        function(err)
        {
            //Create the error object
            $scope.error = {
                isError : true,
                text: ""
            };

            //Error, Inform the user of the status
            if(err.status == 401)
            {
                //Session is invalid! Redirect to 404
                $scope.error.text = "Sorry, the entered account information is incorrect.";
            }
            else
            {
                //An unexpected error has occured, log into console
                $scope.error.text = "Sorry, an error has occured connecting to the database";
            }
        });

    }

    //get the locations from the backend
    $scope.getLocations = function() {

        //Json to send to the backend
        var payload = {
            "id" : $scope.owner._id
        }

        LocationByOwner.get(payload,
        function(data, status) {

            //Success, save the data from the backend in scope
            $scope.locations = data;

            //Show(true)/Hide(false) the loading spinner
            $scope.loading = false;
        },
        function(err)
        {
            //Error, Create the error object
            $scope.error = {
                isError : true,
                text: "",
                noLocations: false
            };

            if(err.status == 401)
            {
                $scope.error.text = "Sorry, the entered account information is incorrect.";
            }
            if(err.status == 404)
            {
                $scope.error.noLocations = true;
            }
            else {
                $scope.error.text = "Sorry, an error has occured connecting to the database";
            }
        });
    }

    //Delete a location
    $scope.deleteLocation = function(theLocation) {

        console.log("THIS DOESNT WORK YET, BACKEND IS NOT READY :(");

        //First set up some JSON for the session token
        var payload = {
           "sessionToken" : sessionToken
        }

        Owners.get(payload,
        function(data, status) {

            //Success, save the data from the backend to scope
            $scope.owner = data;
        },
        function(err)
        {
            //Error, Create the error object
            $scope.error = {
                isError : true,
                text: "",
                noLocations: false
            };

            if(err.status == 401)
            {
                $scope.error.text = "Sorry, the entered account information is incorrect.";
            }
            if(err.status == 404)
            {
                $scope.error.noLocations = true;
            }
            else {
                $scope.error.text = "Sorry, an error has occured connecting to the database";
            }
        });
    }

    //create a location
    $scope.redirectCreate = function() {
        //redirect to the create a location page
        $location.path("/dashboard/createlocation")
    }

  });
