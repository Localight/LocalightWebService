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

    //Boolean for alert
    $scope.rotateAlert = false;

    //Get our merchant ID
    $scope.Id = $routeParams.merchantId;

    //get our session token from the cookies
    $scope.sessionToken = $cookies.get("sessionToken");

    //Check for device orientation
    $window.addEventListener("orientationchange", function() {
        if(!$scope.rotateAlert && ($window.orientation == -90 || $window.orientation == 90))
        {
            $scope.rotateAlert = true;
            alert("Please disable device rotation, this application is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
        }
    }, false);

		//Timeout to the next page
		$timeout(timeoutRedirect, 2000);

		//Get our merchant ID
		$scope.Id = $routeParams.merchantId;

        //Get our location
        $scope.getLocation = function() {
            //Get our giftcards from the user
            //First set up some JSON for the session token
            var getJson = {
                "id" : $scope.Id,
                "sessionToken" : $scope.sessionToken
            }

            $scope.merchantLocation = LocationById.get(getJson, function(){
                //Check for errors
                if($scope.merchantLocation.errorid)
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

		//Redirect to the thank you page
		function timeoutRedirect()
		{
    		$location.path("/merchants/" + $scope.Id + "/thankyou");
		}

  });
