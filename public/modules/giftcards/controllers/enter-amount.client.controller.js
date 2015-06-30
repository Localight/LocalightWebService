'use strict';

angular.module('giftcards').controller('EnterAmountController', ['$scope',
	function($scope) {

		//Initialize scope.giftcards
		$scope.giftcards = null;

		//Variable if a button is clicked
		$scope.clicked = false;

		//Amoutn entered
		$scope.amount = 0.00;

		//Our stack of digits entered
		$scope.digitStack = [];

		//Our size of our stack
		$scope.stackSize = 0;

		//Our variable for which button is selected
		$scope.pressed = -1;

		//Boolean for if we should show a warning about max
		//Or total value
		$scope.warning = false;
		$scope.totalWarning = false;

		// Find a list of Giftcards
		$scope.find = function() {
			//$scope.giftcards = Giftcards.query();

			//FOr testing, hardcoding scope giftcards
			$scope.giftcards =
			[
				{
					to: "John",
					amt: "100",
					mobileNumberOfRecipient: "5625555555",
					merchant: "xxxxx",
					from: 'Tony',
					message: "hi",
					districtNumber: 'number',
					occasionMessage: "Variety is the spice of life. So I'm giving you the gift of choice!"
				},
				{
					to: "John",
					amt: "100",
					mobileNumberOfRecipient: "5625555555",
					merchant: "xxxxx",
					from: 'Frank',
					message: "hi",
					districtNumber: 'number'
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
			return "$" + total;
		}

		//Function to switch the value of pressed
		$scope.pressButton = function (i)
		{
			//Clicked is now true
			$scope.clicked = true;

			$scope.pressed = i;

			//Ignore values that are negative one, since thye simply disable our selectors
			//Also checking for the number of digits
			if(i != -1)
			{
				//Add to our amount from right to left, so just concatanate to the string
				//push i onto the queue
				//Push onto the stack
				$scope.digitStack.push(i);

				//Increase stack size,
				//only if it is less than our max digits, 5
				if($scope.stackSize < 5)
				{
					$scope.stackSize++;
				}

				//Our final answer
				var answer = 0;

				//create a temp stack we can peek
				var tempStack = $scope.digitStack.slice();

				//Loop to put in our places
				for(i = $scope.stackSize; i > 0; --i)
				{
					//Get the value
					var pop = tempStack.pop();

					//add it to the amount by multipling it by ten
					//by a certain power, -3 for cents
					var add = pop * Math.pow(10, ($scope.stackSize - i - 2));

					//Now add the amount to amount
					answer = answer + add;
				}

				//Now format amount
				//Also, check if the amount is greater than our maxes
				if(answer > parseFloat2($scope.totalValue()).toFixed(2))
				{
					//Show the warning
					$scope.totalWarning = true;
					$scope.warning = false;
					//Make the amount 500
					$scope.amount = parseFloat2($scope.totalValue()).toFixed(2);
				}
				else if(answer > 500)
				{
					//Show the warning
					$scope.warning = true;
					$scope.totalWarning = false;
					//Make the amount 500
					$scope.amount = parseFloat(500.00).toFixed(2);
				}
				else
				{
					//Nothing wrong, show!
					$scope.amount = parseFloat(answer).toFixed(2);
				}
			}
		}


		//A better function to parse float from total value
		function parseFloat2(str)
		{
		    str = (str + '').replace(/[^\d,.-]/g, '')
		    var sign = str.charAt(0) === '-' ? '-' : '+'
		    var minor = str.match(/[.,](\d+)$/)
		    str = str.replace(/[.,]\d*$/, '').replace(/\D/g, '')
		    return Number(sign + str + (minor ? '.' + minor[1] : ''))
		}

	}
]);
