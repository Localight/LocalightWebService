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

          //giftcards list
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
            //Get our giftcards from the user
            //First set up some JSON for the session token
            var getJson = {
                "id" : $scope.Id,
                "sessionToken" : $scope.sessionToken
            }

            $scope.merchantLocation = LocationById.get(getJson, function(response){
                //Check for errors
                if(response.status)
                {
                    if(response.status == 401)
                    {
                        //Bad session
                        //Redirect them to a 404
                        $location.path("#/");
                        return;
                    }
                    else
                    {
                        console.log("Status:" + response.status + ", " + $scope.giftcards.msg);
                        return;
                    }
                }
                else {
                    //there was no error continue as normal
                    //Stop any loading bars or things here
                }
            },
            //check for a 500
            function(response)
            {
                console.log("Status:" + response.status + ", Internal Server Error");
                return;
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
			//Get our giftcards from the user
            //First set up some JSON for the session token
            var getJson = {
                "sessionToken" : $scope.sessionToken
            }

            //Query the backend using out session token
            $scope.giftcards = Giftcards.get(getJson, function(response)
            {
                //Check for errors
                if(typeof response === "object")
                {
                    if(response.status)
                    {
                        if(response.status == 401)
                        {
                            //Bad session
                            //Redirect them to a 404
                            $location.path("#/");
                            return;
                        }
                        else
                        {
                            console.log("Status:" + response.status + ", " + $scope.giftcards.msg);
                            return;
                        }
                    }
                }
                else {
                    //there was no error continue as normal
                    //Stop any loading bars or things here
                }
            },
            //check for a 500
            function(response)
            {
                console.log("Status:" + response.status + ", Internal Server Error");
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

		//Function to go back to selecting merchants
		$scope.goTo = function(place) {
			//Send the user to another page!

			$location.path(place);
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
