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
		$scope.touchEvent;
		$scope.newTouchEvent = function(touchEvent){
			$scope.touchEvent = touchEvent;
		}

		//When tricon is being pressed, this function will be launched
		$scope.pressed = function(id){
			//Add tricon code here
			//console.log("Tricon Pressed: " + $scope.images[id]);
			//
			event.currentTarget.style.backgroundImage = 'url(/modules/giftcards/img/tricon/' + $scope.images[id] + '-wht.png)';
		}

		//When tricon is unpressed, this function will be launched
		$scope.unpressed = function(id){
			event.currentTarget.style.backgroundImage = 'url(/modules/giftcards/img/tricon/' + $scope.images[id] + '.png)';
		}

		//Holds the table layout for the dynamic ng-repeat table
		$scope.tableLayout = [
				[0,1,2],
				[3,4,5],
				[6,7,8]
		]

		//Array of the eatery tricons and their paths
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

		//Preloads the tricons so that clicking responds with no delay
		var imageLoader = [];
		for(var i = 0; i < $scope.images.length; i++){
			imageLoader[i] = new Image();
			imageLoader[i].src = "/modules/giftcards/img/tricon/" + $scope.images[i] + "-wht.png";
		}

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
