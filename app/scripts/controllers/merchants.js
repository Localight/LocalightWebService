'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:MerchantsCtrl
 * @description
 * # MerchantsCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('MerchantsCtrl', function ($scope, $window, Giftcards, Locations, $cookies) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Switch overlay off
	document.getElementById('darkerOverlay').style.display = "none";

	//Initialize scope.giftcards
	$scope.giftcards;

    //The array of available locations
	$scope.merchantsArray;

    //get our session token from the cookies
    $scope.sessionToken = $cookies.get("sessionToken");

    $scope.getLocations = function() {
        //Json to send to the backend
        var locationJson = {
            "sessionToken" : $scope.sessionToken
        }

        $scope.merchantsArray = Locations.get(locationJson, function()
        {
            //Check for errors
            if($scope.giftcards.errorid)
            {
                console.log($scope.giftcards.errorid + ": " + $scope.giftcards.msg);
                return;
            }
            else {
                //there was no error continue as normal
                //Stop any loading bars or things here
            }
        });
    }


    // Find a list of Giftcards from the DB
    $scope.getGiftcards = function() {
        //Get our giftcards from the user
        //First set up some JSON for the session token
        var getJson = {
            "sessionToken" : $scope.sessionToken
        }

        //Query the backend using out session token
        $scope.giftcards = Giftcards.get(getJson, function()
        {
            //Check for errors
            if($scope.giftcards.errorid)
            {
                console.log($scope.giftcards.errorid + ": " + $scope.giftcards.msg);
                return;
            }
            else {
                //there was no error continue as normal
                //Stop any loading bars or things here
            }
        });
    }

	$scope.totalValue = function()
	{
		//Get the total value of all the giftcards
		var total = 0;
		for(var i = 0; i < $scope.giftcards.length; ++i)
		{
			total = total + parseInt($scope.giftcards[i].amount, 10);
		}

		//Return the total value as a formatted string
		return (parseInt(total) / 100).toFixed(2);
	}

  });
