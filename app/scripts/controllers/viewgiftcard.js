'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:ViewgiftcardCtrl
 * @description
 * # ViewgiftcardCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('ViewgiftcardCtrl', function ($scope, $routeParams, $cookies, GiftcardById, $window, $location) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        //Boolean for alert
        $scope.rotateAlert = false;

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

		//Initialize scope.giftcards
		$scope.giftcard;

        //Get our giftcard id from the route params
        var giftcardId = $routeParams.giftcardId;

        //Get the session token
        var sessionToken;

        if($location.search().token)
        {
            //get our session token
            sessionToken = $location.search().token;

            //Place the session token in the cookies
            $cookies.put("sessionToken", sessionToken);
        }
        else if($cookies.get("sessionToken"))
        {
            //get our session token from the cookies
            sessionToken = $cookies.get("sessionToken");
        }
        else {
            //Redirect them to a 404
            $location.path("#/");
        }

		//Src to our merchant imgaes
		$scope.merchants =
		[
            {
                "name": "MADE In Long Beach",
                "image": "../images/feature-card-made.jpg"
            }
		]

		// Find the giftcard
		$scope.getGiftcards = function() {
            //Get our giftcards from the user
            //First set up some JSON for the session token
            var getJson = {
                "id" : giftcardId,
                "sessionToken" : sessionToken
            }

            $scope.giftcard = GiftcardById.get(getJson, function(response){
                //Check for errors
                if(response.status)
                {
                    console.log($scope.giftcard.status);

                    //Redirect them to a 404
                    $location.path("#/");

                    return;
                }
                else {
                    //there was no error continue as normal
                    //Stop any loading bars or things here
                }
            },
             //Error catching function
            function() {
                //Also check if there was a response (Check the to id as it must always be returned)
                if(!$scope.giftcard._id)
                {
                    //if there wasnt, redirect
                    //Redirect them to a 404
                    $location.path("#/");
                }
            });
		}

		$scope.totalValue = function()
		{
			//Return the total value as a formatted string
			return (parseInt($scope.giftcard.amount) / 100).toFixed(2);
		}

		//function to fomat a giftcard value for us
		$scope.giftValue = function(amt)
		{
			//Return the total value as a formatted string
			return (parseInt(amt) / 100).toFixed(2);
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
  });
