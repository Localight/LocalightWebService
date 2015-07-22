'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:TiltScreenCtrl
 * @description
 * # TiltScreenCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('TiltScreenCtrl', function ($scope, $location, $routeParams, $cookieStore) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Switch overlay on
		document.getElementById('darkerOverlay').style.display = "block";

		//Get our merchant ID
		$scope.Id = $routeParams.merchantId;

		//Our merchants
		$scope.merchants = [{
			area: "4th Street Retro Row",
			name: "Goldies On 4th",
			id: 0,
			address: "2106 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Aji Peruvian Cuisine",
			id: 1,
			address: "2308 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "P3 Artisan Pizza",
			id: 2,
			address: "2306 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "The Social List",
			id: 3,
			address: "2105 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Lola's",
			id: 4,
			address: "2030 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Portfolio's Coffee",
			id: 5,
			address: "2300 E 4th St, Long Beach, CA"
		}]

		//Get the amount we are going to send the server
		$scope.getAmount = function()
		{
			//Retrive the cookie with our amount
			var amount = $cookieStore.get("igosdmbmtv");
			if(!amount)
			{
				$scope.goTo("/merchants/" + $scope.Id + "/amount");
			}
			return (parseInt(amount) / 100).toFixed(2);
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

  });
