'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:CreatelocationCtrl
 * @description
 * # CreatelocationCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('CreatelocationCtrl', function ($scope, $cookies, $location, Owners, Locations) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //get our session token
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

    //Create the location
    $scope.createLocation = function() {

        //First set up some JSON for the session token
        var postJson = {
           "sessionToken" : sessionToken,
           "name" : $scope.locationName,
           "triconKey" : $scope.triconKey,
           "address1" : $scope.address1,
           "address2" : $scope.address2,
           "city" : $scope.city,
           "state" : $scope.state,
           "zipcode" : $scope.zipcode,
           "ownerId" : $scope.owner._id
        }

        $scope.postLocation = Locations.create(postJson, function(){
            //Check for errors
            if($scope.postLocation.errorid)
            {
                console.log($scope.postLocation.msg);
                return;
            }
            else
            {
                //there was no error continue as normal
                //Save their session token
                console.log("Location Created!");

                //redirect back to the main page
                $location.path("/panel/main");
            }
        });
    }
  });
