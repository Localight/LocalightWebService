'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:TiltScreenCtrl
 * @description
 * # TiltScreenCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('TiltScreenCtrl', function ($scope, $location, $routeParams, $cookies, LocationById) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Switch overlay on
		document.getElementById('darkerOverlay').style.display = "block";

		//Get our merchant ID
		$scope.Id = $routeParams.merchantId;

        //get our session token from the cookies
        $scope.sessionToken = $cookies.get("sessionToken");

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
