'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:ViewgiftcardCtrl
 * @description
 * # ViewgiftcardCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('ViewgiftcardCtrl', function ($scope, $routeParams, $cookies, GiftcardById) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Switch overlay off
      	document.getElementById('darkerOverlay').style.display = "none";

		//Initialize scope.giftcards
		$scope.giftcard;

        //get our session token from the cookies
        var sessionToken = $cookies.get("sessionToken");

        //Get our giftcard id from the route params
        var giftcardId = $routeParams.giftcardId;

		//Src to our merchant imgaes
		$scope.merchantImages =
		[
			"../images/dolys-delectables-crop.jpg",
			""
		]

		// Find a list of Giftcards
		$scope.getGiftcards = function() {
            //Get our giftcards from the user
            //First set up some JSON for the session token
            var getJson = {
                "id" : giftcardId,
                "sessionToken" : sessionToken
            }

            $scope.giftcard = GiftcardById.get(getJson, function(){
                //Check for errors
                if($scope.giftcard.errorid)
                {
                    console.log("Error #" + $scope.giftcard.errorid + ": " + $scope.giftcard.msg);
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
			//Return the total value as a formatted string
			return (parseInt($scope.giftcard) / 100).toFixed(2);
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
