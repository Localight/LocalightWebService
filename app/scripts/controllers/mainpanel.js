'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:MainpanelCtrl
 * @description
 * # MainpanelCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('MainpanelCtrl', function ($scope, $cookies, $location, Owners, Locations) {
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

    //get the locations
    $scope.getLocations = function() {
        //Json to send to the backend
        var locationJson = {
            "sessionToken" : $scope.sessionToken
        }

        $scope.locations = Locations.get(locationJson, function()
        {
            //Check for errors
            if($scope.locations.errorid)
            {
                console.log($scope.locations.errorid + ": " + $scope.locations.msg);
                return;
            }
            else {
                //there was no error continue as normal
                //Stop any loading bars or things here
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


  });
