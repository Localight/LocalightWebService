'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:ConfirmationTimeoutCtrl
 * @description
 * # ConfirmationTimeoutCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('ConfirmationTimeoutCtrl', function ($scope, $timeout, $location, $routeParams, $cookies, $window, LocationById) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Boolean to alert rotation to the user
    $scope.rotateAlert = false;

    //get our session token from the cookies
    $scope.sessionToken = $cookies.get("sessionToken");

    //Get our merchant ID
    $scope.Id = $routeParams.merchantId;

    //Timeout, the redirect to the next page
    $timeout(timeoutRedirect, 2000);

    //Check for device orientation
    $window.addEventListener("orientationchange", function() {
        if(!$scope.rotateAlert && ($window.orientation == -90 || $window.orientation == 90))
        {
            $scope.rotateAlert = true;
            alert("Please disable device rotation, this application is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
        }
    }, false);

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
                //Redierect to the amount screen if there is no amount cookie
				$scope.goTo("/merchants/" + $scope.Id + "/amount");
			}
			return (parseInt(amount) / 100).toFixed(2);
		}

		//Redirect to the thank you page
		function timeoutRedirect()
		{
    		$location.path("/merchants/" + $scope.Id + "/thankyou");
		}

  });
