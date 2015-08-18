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

        //Boolean if the giftcard can e spent
        $scope.isValid;

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

        // Find a list of Giftcards
		$scope.getGiftcards = function() {
			//Get our giftcards from the user
            //First set up some JSON for the session token
            var getJson = {
                "id" : giftcardId,
                "sessionToken" : sessionToken
            }

            //Query the backend using out session token
            $scope.giftcard = GiftcardById.get(getJson, function(response)
            {
                //Error checking should be done in next block

                //check if it was spent
                if($scope.giftcard.amount < 1)
                {
                    $scope.isValid = false;
                }
            },
            //check for a 500
            function(response)
            {
                //Check for unauthorized
                if(response.status == 401 || response.status == 500)
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
			//Return the total value as a formatted string
			return (parseInt($scope.giftcard.amount) / 100).toFixed(2);
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
