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

    //Boolean Rotation alert to display to the user
    $scope.rotateAlert = false;

    //Check for device orientation
    $window.addEventListener("orientationchange", function() {
        if(!$scope.rotateAlert && ($window.orientation == -90 || $window.orientation == 90))
        {
            $scope.rotateAlert = true;
            alert("Please disable device rotation, this application is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
        }
    }, false);

		//Get our merchant ID from the url
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

		//Function to go to the route provided in the params
		$scope.goTo = function(place)
		{
			//Save our final amount if the path is to pay
			if(place == "/#!/")
			{

			}
			$location.path(place);
		}

  });
