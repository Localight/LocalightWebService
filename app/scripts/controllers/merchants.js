'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:MerchantsCtrl
 * @description
 * # MerchantsCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('MerchantsCtrl', function ($scope, $window, Giftcards, Locations, $cookies, $location) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Boolean to alert the user for rotation
    $scope.rotateAlert = false;

    //Check for device orientation
    $window.addEventListener("orientationchange", function() {
        if(!$scope.rotateAlert && ($window.orientation == -90 || $window.orientation == 90))
        {
            $scope.rotateAlert = true;
            alert("Please disable device rotation, this application is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
        }
    }, false);

	//Initialize our giftcards in scope
	$scope.giftcards;

    //Initialize our merchants in scope
	$scope.merchantsArray;

    //Get our session token from the cookies
    var sessionToken;

    if($cookies.get("sessionToken"))
    {
        sessionToken = $cookies.get("sessionToken");
    }
    else
    {
        //Redirect them to a 404
        $location.path("#/");
    }

    $scope.getLocations = function() {

        //Json to send to the backend
        var payload = {
            "sessionToken" : sessionToken
        }

        //Send the payload to the backend to get the locations
        Locations.get(payload,
        function(data, status) {

            //Success save the response to scope
            $scope.merchantsArray = data;

            //Show(true)/Hide(false) the loading spinner, if everything is loaded
            if($scope.giftcards) $scope.loading = false;
        },
        function(err)
        {

            //Error, Inform the user of the status
            if (err.status == 401) {
               //Session is invalid! Redirect to 404
               $location.path("/");
            } else {
               //An unexpected error has occured, log into console
               console.log("Status: " + err.status + " " + err.data.msg);
            }
        });
    }


    // Find a list of Giftcards
	$scope.getGiftcards = function() {

        //First set up some JSON for the session token
        var payload = {
            "sessionToken" : sessionToken
        }

        //Query the backend using our session token
        Giftcards.get(payload,
        function(data, status) {
            ///Success save giftcards in scope
            $scope.giftcards = data;

            //the values of the giftcards
            $scope.getTotalValue();

            //Show(true)/Hide(false) the loading spinner, if everything is loaded
            if($scope.merchantsArray) $scope.loading = false;
        },

        function(err)
        {
            //Error, Inform the user of the status
            if (err.status == 401) {
               //Session is invalid! Redirect to 404
               $location.path("/");
            } else {
               //An unexpected error has occured, log into console
               console.log("Status: " + err.status + " " + err.data.msg);
            }
        });
	}

    //The total value of all of the user's giftcards
    $scope.totalValue = "";
    $scope.getTotalValue = function()
    {
        //Get the total value of all the giftcards
        var total = 0;
        for(var i = 0; i < $scope.giftcards.length; ++i)
        {
            total = total + parseInt($scope.giftcards[i].amount, 10);
        }

        //Return the total value as a formatted string
        $scope.totalValue = (parseInt(total) / 100).toFixed(2);
    }

    //Remove the sender's id for the thank you page
    $scope.senderId = function () {
        //put the sender into cookies to retrieve later
        $cookies.remove('senderName');
        $cookies.remove('senderId');
        $cookies.remove('senderIcon');

        //Change locations to the merchants page
        $location.path("/giftcards");
    }

  });
