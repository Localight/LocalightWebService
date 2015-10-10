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

    //Grab our session token
    var sessionToken = $cookies.get("sessionToken");

    //Get our owner Info
    $scope.getOwner = function() {

        //First set up some JSON for the session token
        var getJson = {
           "sessionToken" : sessionToken
        }

        $scope.owner = Owners.get(getJson, function(){
                //there was no error continue as normal
                //Get the locations
                $scope.getLocations();
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
        });

    }

    //get the locations
    $scope.getLocations = function() {
        //Json to send to the backend
        var locationJson = {
            "id" : $scope.owner._id
        }

        $scope.locations = LocationByOwner.get(locationJson, function()
        {
                //there was no error continue as normal
                //Stop any loading bars or things here
        },
        //Check for errors
        function(response)
        {
            //Create the error object
            $scope.error = {
                isError : true,
                text: "",
                noLocations: false
            };

            if(response.status == 401)
            {
                $scope.error.text = "Sorry, the entered account information is incorrect.";
            }
            if(response.status == 404)
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
        var delJson = {
           "sessionToken" : sessionToken
        }

        $scope.owner = Owners.get(getJson, function(){
            //Check for errors
            if($scope.owner.errorid)
            {
                console.log($scope.owner.msg);
                return;
            }
            else
            {
                //there was no error continue as normal
                //Save their session token

            }
        });
    }

    //create a location
    $scope.redirectCreate = function() {
        //redirect to the create a location page
        $location.path("/panel/createlocation")
    }

  });
