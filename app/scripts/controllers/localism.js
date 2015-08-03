'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:LocalismCtrl
 * @description
 * # LocalismCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('LocalismCtrl', function ($scope, $cookies, $window) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        //Check for device orientation
        $window.addEventListener("orientationchange", function() {
            if($window.orientation == -90 || $window.orientation == 90)
            {
                alert("Please disable device rotation, this app is meant to be used in portrait mode. You could risk spending a giftcard incorrectly, or losing your data.");
            }
        }, false);

        //Switch overlay off
      	document.getElementById('darkerOverlay').style.display = "none";

          //get our session token from the cookies
          $scope.sessionToken = $cookies.get("sessionToken");

		//Initialize scope.giftcards
		$scope.giftcards = null;

		// Find a list of Giftcards
		$scope.getGiftcards = function() {
			//$scope.giftcards = Giftcards.query();

			//FOr testing, hardcoding scope giftcards
			$scope.giftcards =
			[
				{
					_id: "1",
					to: "John",
					amt: "10000",
					mobileNumberOfRecipient: "5625555555",
					merchant: "xxxxx",
					from: 'Tony',
					message: "hi",
					districtNumber: 'number',
					occasionMessage: "Variety is the spice of life. So I'm giving you the gift of choice!"
				},
				{
					_id: "2",
					to: "John",
					amt: "10000",
					mobileNumberOfRecipient: "5625555555",
					merchant: "xxxxx",
					from: 'Frank',
					message: "hi",
					districtNumber: 'number',
					occasionMessage: "Congratulations on your baby!"
				}
			]
		}

		$scope.totalValue = function()
		{
			//Get the total value of all the giftcards
			var total = 0;
			for(var i = 0; i < $scope.giftcards.length; ++i)
			{
				total = total + parseInt($scope.giftcards[i].amt, 10);
			}

			//Return the total value as a formatted string
			return (parseInt(total) / 100).toFixed(2);
		}

  });
