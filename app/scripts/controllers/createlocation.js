'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:CreatelocationCtrl
 * @description
 * # CreatelocationCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('CreatelocationCtrl', function ($scope, $cookies, $location, $route, Owners, Locations) {

    //get our session token
    var sessionToken = $cookies.get("sessionToken");

    //switch the pages
    $scope.switchPage = function() {
        //Set the background to dark
        document.body.style.backgroundImage = "url('../images/auth-bg.png')";
        document.body.style.backgroundColor = "#316D6B"

        //Set show the next page to true
        $scope.showNextPage = true;
    }

    //Create the location
    $scope.submitLocation = function() {

        //First set up some JSON for the session token
        var postJson = {
           "sessionToken" : sessionToken,
           "name" : $scope.locationName,
           "triconKey" : $scope.triconKey,
           "address1" : $scope.address1,
           "address2" : $scope.address2,
           "city" : $scope.city,
           "state" : $scope.state,
           "zipcode" : $scope.zipcode
       };

        $scope.newLocation = Locations.create(postJson, function(){

            //Success!
            //redirect back to the main page
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
            else {
                $scope.error.text = "Sorry, an error has occured connecting to the database";
            }
        });
    }

  });
