'use strict';

angular.module('giftcards').controller('ConfirmationPageController', ['$scope',
	function($scope) {

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
	}
]);
