'use strict';

angular.module('giftcards').controller('TriconController', ['$scope',
	function($scope) {

		//Switch overlay on
		document.getElementById('darkerOverlay').style.display = "block";

		//Shuffles an array using the Fisher-Yates algorithm
		$scope.shuffle = function(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex ;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }

		  return array;
		}

		//When tricon is being pressed, this function will be launched
		$scope.pressed = function(id){
			//Add tricon code here
			//console.log("Tricon Pressed: " + $scope.images[id]);
			//
			event.currentTarget.style.backgroundPositionY = '-100px';
		}

		//When tricon is unpressed, this function will be launched
		$scope.unpressed = function(id){
			event.currentTarget.style.backgroundPositionY = '0px';
		}

		//Holds the table layout for the dynamic ng-repeat table
		$scope.tableLayout = [
				[0,1,2],
				[3,4,5],
				[6,7,8]
		];

		//Array of the eatery tricons and their paths
		$scope.images =
		[
			{name: "tricon-coffee", pos: "600"},
			{name: "tricon-cupcake", pos: "0"},
			{name: "tricon-dinner", pos: "300"},
			{name: "tricon-pie-slice", pos: "800"},
			{name: "tricon-sandwich", pos: "100"},
			{name: "tricon-shrimp", pos: "200"},
			{name: "tricon-soup", pos: "400"},
			{name: "tricon-sundae", pos: "700"},
			{name: "tricon-wine", pos: "500"}
		];

		//Shuffles the images array of tricons to always
		//display in different order
		$scope.images = $scope.shuffle($scope.images);

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
