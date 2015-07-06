'use strict';

angular.module('giftcards').controller('ThankYouController', ['$scope',
	function($scope) {
		
		//Switch overlay off
      	document.getElementById('darkerOverlay').style.display = "none";

		//Initialize scope.giftcards
		$scope.giftcards = null;


	}
]);
