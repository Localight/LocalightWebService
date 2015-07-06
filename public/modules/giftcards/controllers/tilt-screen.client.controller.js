'use strict';

angular.module('giftcards').controller('TiltScreenController', ['$scope', '$location',
	function($scope, $location)
	{

		//Switch overlay on
		document.getElementById('darkerOverlay').style.display = "block";

		//Get the amount we are going to send the server
		$scope.getAmount = function()
		{
			//Replace this with a backend call eventually
			return (parseInt(1000) / 100).toFixed(2);
		}

		//Get the merchant we are going to send the server
		$scope.getMerchant = function()
		{
			//Replace this with a backend call eventually
			return "Doly's Delectables";
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
	}
]);
