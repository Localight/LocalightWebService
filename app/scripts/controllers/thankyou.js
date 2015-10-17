'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:ThankyouCtrl
 * @description
 * # ThankyouCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('ThankyouCtrl', function ($scope, $routeParams, $cookies, $location, $window, Giftcards, LocationById) {

        //Boolean for rotation alert to the user alert
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

      //get our session token from the cookies
      $scope.sessionToken;

      if($cookies.get("sessionToken"))
      {
          $scope.sessionToken = $cookies.get("sessionToken");
      }
      else
      {
          //Redirect them to a 404
          $location.path("#/");
      }

	//Our character count for the text area
	$scope.charCount;

	//Total purcahse value
	$scope.purchaseValue;

    //Get our merchant ID
	$scope.Id = $routeParams.merchantId;

    //Get our amount
    $scope.spentAmount = (parseInt($cookies.get("igosdmbmtv")) / 100).toFixed(2);
    $cookies.remove("igosdmbmtv");

    //Get our location
    $scope.getLocation = function() {

        //First set up some JSON for the session token
        var payload = {
            "id" : $scope.Id,
            "sessionToken" : $scope.sessionToken
        }

        //Send the payload to the backend
        LocationById.get(payload,
            function(data, status) {
            //Success! Save the response to our scope!
            $scope.merchantLocation = data;

        }, function(err) {

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


	//Prepare our text area
	$scope.setTextArea = function ()
	{
		//Set the default value of our text area
		document.getElementById("thankYouNote").value = $scope.giftcards[0].fromId.name + ", I used the Local Giftcard at "
		+ $scope.merchantLocation.name + " to get...";
	}

	//Count our text area characters
	$scope.countCharacters = function()
	{
		$scope.charCount = 160 - document.getElementById("thankYouNote").value.length;
	}

    // Find a list of Giftcards
	$scope.getGiftcards = function() {

        //First set up some JSON for the session token
        var payload = {
            "sessionToken" : $scope.sessionToken
        }

        //Query the backend using our session token
        Giftcards.get(payload,
        function(data, status) {
            ///Success save giftcards in scope
            $scope.giftcards = data;

            //Get the total value of all the Giftcards
            $scope.getTotalValue();
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

	//Function to go back to a page passed in params
	$scope.goTo = function(place) {
		$location.path(place);
	}

    //Send the thank you
    $scope.sendThanks = function() {

        //First set up some JSON for the session token
        var payload = {
           "sessionToken" : $scope.sessionToken,
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
            $location.path("/panel/main");
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
        });
    }

	//Array of occasion Icons, simply a link to their icon
	$scope.icons =
	[
		//Anniversary
		"../images/occasion-anniversary-icon-wht.png",
		//Baby
		"../images/occasion-baby-icon-wht.png",
		//Birthday
		"../images/occasion-birthday-icon-wht.png",
		//Congrats
		"../images/occasion-congrats-icon-wht.png",
		//Present (Custom Icon)
		"../images/occasion-custom-icon-wht.png",
		//Get Well Soon
		"../images/occasion-getwell-icon-wht.png",
		//Love
		"../images/occasion-love-icon-wht.png",
		//Sympathy
		"../images/occasion-sympathy-icon-wht.png",
		//Thank You
		"../images/occasion-thankyou-icon-wht.png",
		//Wedding
		"../images/occasion-wedding-icon-wht.png"
	]

    //Array of Occasion headings
	$scope.iconHeaders =
	[
		//Anniversary
		"Happy Anniversary!",
		//Baby
		"Congratulations on the Baby!",
		//Birthday
		"Happy Birthday!",
		//Congrats
		"Congratulations!",
		//Present (Custom Icon)
		"Enjoy Your Gift!",
		//Get Well Soon
		"Get Well Soon!",
		//Love
		"Love You!",
		//Sympathy
		"Feel Better Soon!",
		//Thank You
		"Thank You!",
		//Wedding
		"Congratulations on the Wedding!"
	]
  });
