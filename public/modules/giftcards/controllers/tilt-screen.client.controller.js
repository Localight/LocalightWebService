'use strict';

angular.module('giftcards').controller('TiltScreenController', ['$scope',
	function($scope)
	{
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
