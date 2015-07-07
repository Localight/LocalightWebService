'use strict';

angular.module('giftcards').controller('ConfirmationPageController', ['$scope', '$timeout', '$location',
	function($scope, $timeout, $location) {

		//Switch overlay on
		document.getElementById('darkerOverlay').style.display = "block";

		//Timeout to the next page
		$timeout(timeoutRedirect, 2000);

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

		//Redirect to the thank you page
		function timeoutRedirect()
		{
    		$location.path("/thankyou");
		}
	}
]);
