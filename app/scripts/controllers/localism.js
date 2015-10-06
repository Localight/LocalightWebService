'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:LocalismCtrl
 * @description
 * # LocalismCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('LocalismCtrl', function ($scope, $cookies, $window, Giftcards) {

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

          //get our session token from the cookies
          $scope.sessionToken = $cookies.get("sessionToken");

		//Initialize scope.giftcards
		$scope.giftcards = null;

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
                //Error checking should be done in next block
            },
            //check for a 500
            function(response)
            {
                //Check for unauthorized
                if(response.status == 401)
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
			//Get the total value of all the giftcards
			var total = 0;
			for(var i = 0; i < $scope.giftcards.length; ++i)
			{
				total = total + parseInt($scope.giftcards[i].amount, 10);
			}

			//Return the total value as a formatted string
			return (parseInt(total) / 100).toFixed(2);
		}

  });
