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

        //Boolean for rotation alert to the user
        $scope.rotateAlert = false;

        //Boolean if the giftcard can be spent
        $scope.isValid;

        //Check for device orientation
        $window.addEventListener("orientationchange", function() {
            if(!$scope.rotateAlert && ($window.orientation == -90 || $window.orientation == 90))
            {
                $scope.rotateAlert = true;
                alert("Please disable device rotation, this application is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
            }
        }, false);

		//Initialize giftcards in scope
		$scope.giftcard;

        //Get our giftcard id from the url
        var giftcardId = $routeParams.giftcardId;

        //Get the session token from the cookies
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

            //First set up some JSON for the session token
            var payload = {
                "sessionToken" : $scope.sessionToken
            }

            //Query the backend using our session token
            Giftcards.get(payload,
            function(data, status) {
                ///Success save giftcards in scope
                $scope.giftcards = data;
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
