'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:ViewgiftcardCtrl
 * @description
 * # ViewgiftcardCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('ViewgiftcardCtrl', function ($scope, $routeParams, $cookies, GiftcardById, Giftcards, $window, $location) {

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

        // Find a list of Giftcards (For our total value)
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

                //Also get the total value
                $scope.getTotalValue();

                //Show(true)/Hide(false) the loading spinner
                $scope.loading = false;
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

        // Get the Selected Giftcard
    	$scope.getGiftcard = function() {

            //First set up some JSON for the session token
            var payload = {
                "sessionToken" : sessionToken,
                "id": giftcardId
            }

            //Query the backend using our session token
            GiftcardById.get(payload,
            function(data, status) {
                ///Success save giftcards in scope
                $scope.giftcard = data;

                //Check if the giftcard can be used, aka non-zero amount
                if($scope.giftcard.amount > 0) $scope.isValid = true;

                //Show(true)/Hide(false) the loading spinner
                $scope.loading = false;
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

        //Save the sender's id for the thank you page
        $scope.senderId = function () {
            //put the sender into cookies to retrieve later
            $cookies.put('senderName', $scope.giftcard.fromId.name);
            $cookies.put('senderId', $scope.giftcard.fromId._id);
            $cookies.put('senderIcon', $scope.giftcard.iconId);

            //Change locations to the merchants page, and include the location id
            $location.path("/merchants").search({merchant: $scope.giftcard.location.locationId._id});
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
