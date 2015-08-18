'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:ListgiftcardsCtrl
 * @description
 * # ListgiftcardsCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('ListgiftcardsCtrl', function ($scope, $cookies, Giftcards, $window, $location) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        //Boolean for alert
        $scope.rotateAlert = false;

        //Boolean for if we have spent Giftcards
        $scope.spentGifts;

        //Check for device orientation
        $window.addEventListener("orientationchange", function() {
            if(!$scope.rotateAlert && ($window.orientation == -90 || $window.orientation == 90))
            {
                $scope.rotateAlert = true;
                alert("Please disable device rotation, this application is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
            }
        }, false);

        //Switch overlay off
		document.getElementById('darkerOverlay').style.display = "none";

        //Make the background blurred
        setTimeout(function () {
            document.getElementById("localStreetNoBlur").className = "localStreet blur";
        }, 750);

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

		//Initialize scope.giftcards
		$scope.giftcards = null;

		// Find a list of Giftcards
		$scope.getGiftcards = function() {
			//Get our giftcards from the user
            //First set up some JSON for the session token
            var getJson = {
                "sessionToken" : $scope.sessionToken
            }

            //Query the backend using out session token
            $scope.giftcards = Giftcards.get(getJson, function(response)
            {
                //Error checking should be done in next block

                //And since everthign went good, check if we have spent giftcards.
                for(var i = 0; i < $scope.giftcards.length; i++)
                {
                    if($scope.giftcards[i].amount < 1)
                    {
                        $scope.spentGifts = true;
                        return;
                    }
                }

                //No giftcard is spent
            },
            //check for a 500
            function(response)
            {
                //Check for unauthorized
                if(response.status == 401)
                {
                    //Bad session
                    //Redirect them to a 404
                    $location.path("#/");
                }
                else {
                    //log the status
                    console.log("Status:" + response.status);
                }
                return;
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

		//function to fomat a giftcard value for us
		$scope.giftValue = function(amount)
		{
			//Return the total value as a formatted string
			return (parseInt(amount) / 100).toFixed(2);
		}

		//Array of occasion Icons, simply a link to their icon
		$scope.icons =
		[
			//Anniversary
			"/../images/occasion-anniversary-icon-wht.png",
			//Baby
			"/../images/occasion-baby-icon-wht.png",
			//Birthday
			"/../images/occasion-birthday-icon-wht.png",
			//Congrats
			"/../images/occasion-congrats-icon-wht.png",
			//Present (Custom Icon)
			"/../images/occasion-custom-icon-wht.png",
			//Get Well Soon
			"/../images/occasion-getwell-icon-wht.png",
			//Love
			"/../images/occasion-love-icon-wht.png",
			//Sympathy
			"/../images/occasion-sympathy-icon-wht.png",
			//Thank You
			"/../images/occasion-thankyou-icon-wht.png",
			//Wedding
			"/../images/occasion-wedding-icon-wht.png"
		]

        //function to return if a giftcard is spent
        $scope.isSpent = function(giftcard)
        {
            return !(giftcard.amount > 0);
        }

        //function to return if a giftcard is not spent
        //Angular filters cannot be done in reverse
        $scope.isNotSpent = function(giftcard)
        {
            return (giftcard.amount > 0);
        }

        //Function to go to another url, if giftcards is not zero
		$scope.goTo = function(place)
		{
			//Save our final amount if the path is to pay
			if($scope.giftcards.length > 0)
			{
			    $location.path(place);
            }
		}

  });
