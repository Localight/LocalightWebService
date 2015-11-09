'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:TiltScreenCtrl
 * @description
 * # TiltScreenCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('TiltScreenCtrl', function ($scope, $location, $routeParams, $cookies, LocationById, rotationCheck) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        //Reset the rotation alert boolean
        rotationCheck.reset();

		//Get our merchant ID from the url
		$scope.Id = $routeParams.merchantId;

        //get our session token from the cookies
        var sessionToken;

        if($cookies.get("sessionToken"))
        {
            sessionToken = $cookies.get("sessionToken");
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
                "sessionToken" : sessionToken
            }

            //Send the payload to the backend
            LocationById.get(payload,
                function(data, status) {
                //Success! Save the response to our scope!
                $scope.merchantLocation = data;

                //Show(true)/Hide(false) the loading spinner
                $scope.loading = false;
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
