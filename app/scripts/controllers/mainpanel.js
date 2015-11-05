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

    //Array of the eatery tricons and their paths
    $scope.images =
    [
        {name: "tricon-coffee", pos: "600", code: "e107"},
        {name: "tricon-cupcake", pos: "0", code: "e101"},
        {name: "tricon-dinner", pos: "300", code: "e104"},
        {name: "tricon-pie", pos: "800", code: "e109"},
        {name: "tricon-sandwich", pos: "100", code: "e102"},
        {name: "tricon-sushi", pos: "200", code: "e103"},
        {name: "tricon-pho-soup", pos: "400", code: "e105"},
        {name: "tricon-sundae", pos: "700", code: "e108"},
        {name: "tricon-wine", pos: "500", code: "e106"}
    ];

    //function to return the corresponding image positions
    $scope.getTricons = function(triconCode) {

        //Create our tricon position array
        var triconArray = [];
        //Get the values of the corresponding codes
        for(var i = 0; i < 3; i++)
        {
            //Search for the code
            for(var j = 0; j < $scope.images.length; j++)
            {
                //Check if the substring matches the code
                var codeIndex = i * 4;
                if(triconCode.substring(codeIndex, codeIndex + 4)
                == $scope.images[j].code)
                {
                    //Set the value of the tricon array and break from the j loop
                    triconArray[i] = $scope.images[j].pos;
                    break;
                }
            }
        }

        //Return the tricon array!
        return triconArray;
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
