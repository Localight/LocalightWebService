'use strict';

angular.module('giftcards').controller('TriconController', ['$scope',
	function($scope) {

		//Switch overlay on
		document.getElementById('darkerOverlay').style.display = "block";

		//When tricon is being pressed, this function will be launched
		$scope.pressed = function($event, id){
			//Add tricon code here
			console.log("Tricon Pressed: " + $scope.images[id]);
			//
			$event.currentTarget.style.backgroundImage = 'url(/modules/giftcards/img/tricon/' + $scope.images[id] + '-wht.png)';
		}

		//When tricon is unpressed, this function will be launched
		$scope.unpressed = function($event, id){
			$event.currentTarget.style.backgroundImage = 'url(/modules/giftcards/img/tricon/' + $scope.images[id] + '.png)';
		}

		$scope.tableLayout = [
				[0,1,2],
				[3,4,5],
				[6,7,8]
			]

		//Array of the eatery images and their paths
		$scope.images =
		[
			"tricon-coffee",
			"tricon-cupcake",
			"tricon-dinner",
			"tricon-pie-slice",
			"tricon-sandwich",
			"tricon-shrimp",
			"tricon-soup",
			"tricon-sundae",
			"tricon-wine"
		]

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
