'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:TiltScreenCtrl
 * @description
 * # TiltScreenCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('TiltScreenCtrl', function ($scope, $location, $routeParams, $cookies, LocationById, $window) {

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

    //Switch overlay on
    document.body.style.backgroundImage = "url('../images/auth-bg.png')";
    document.body.style.backgroundColor = "#316D6B"

		//Get our merchant ID
		$scope.Id = $routeParams.merchantId;

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

		//Get the amount we are going to send the server
		$scope.getAmount = function()
		{
			//Retrive the cookie with our amount
			var amount = $cookies.get("igosdmbmtv");
			if(!amount)
			{
				$scope.goTo("/merchants/" + $scope.Id + "/amount");
			}
			return (parseInt(amount) / 100).toFixed(2);
		}

		//Function to go back to selecting merchants
		$scope.goTo = function(place)
		{
			//Save our final amount if the path is to pay
			if(place == "/#!/")
			{

			}

			$location.path(place);
		}

  });
