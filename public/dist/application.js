'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'clique';
	var applicationModuleVendorDependencies = [
		'ngResource',
		'ngCookies',
		'ngAnimate',
		'ngTouch',
		'ngSanitize',
		'ui.router',
		'ui.bootstrap',
		'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('giftcards');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Articles module
angular.module('giftcards').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Giftcards', 'giftcards', 'dropdown', '/giftcards(/create)?');
		Menus.addSubMenuItem('topbar', 'giftcards', 'List Giftcards', 'giftcards');
		Menus.addSubMenuItem('topbar', 'giftcards', 'New Giftcard', 'giftcards/create');
	}
]);

'use strict';

//Setting up route
angular.module('giftcards').config(['$stateProvider',
	function($stateProvider) {
		// Giftcards state routing
		$stateProvider.
		state('confirmation-page', {
			url: '/spend/confirmation',
			templateUrl: 'modules/giftcards/views/confirmation-page.client.view.html'
		}).
		state('tricon', {
			url: '/spend/tricon',
			templateUrl: 'modules/giftcards/views/tricon.client.view.html'
		}).
		state('tilt-screen', {
			url: '/spend/tilt',
			templateUrl: 'modules/giftcards/views/tilt-screen.client.view.html'
		}).
		state('selectMerchant', {
			url: '/merchants',
			templateUrl: 'modules/giftcards/views/select-merchant.client.view.html'
		}).
		state('listGiftcards', {
			controller: 'ListGiftCardsController',
			url: '/giftcards',
			templateUrl: 'modules/giftcards/views/list-giftcards.client.view.html'
		}).
		state('createGiftcard', {
			url: '/giftcards/create',
			templateUrl: 'modules/giftcards/views/purchaseSequence/create_giftcard_order.client.view.html'
		}).
		state('viewGiftcard', {
			url: '/giftcards/:giftcardId',
			templateUrl: 'modules/giftcards/views/spendingSequence/recipient.html'
		}).
		state('spendGiftcard', {
			url: '/merchants/:merchantId/amount',
			templateUrl: 'modules/giftcards/views/spendingSequence/spend.html'
		}).
		state('editGiftcard', {
			url: '/giftcards/:giftcardId/edit',
			templateUrl: 'modules/giftcards/views/edit-giftcard.client.view.html'
		});
		// state('reviewGiftcard', {
		// 	url: '/review',
		// 	templateUrl: 'modules/giftcards/views/purchaseSequence/review_giftcard_order.client.view.html'
		// })
		// .state('sendGiftcard', {
		// 	url: '/sent',
		// 	templateUrl: 'modules/giftcards/views/purchaseSequence/giftcard_sent.client.view.html'
		// });
	}
]);

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

'use strict';

angular.module('giftcards').controller('EnterAmountController', ['$scope', '$location',
	function($scope, $location) {

		//Switch overlay on
		document.getElementById('darkerOverlay').style.display = "block";

		//Initialize scope.giftcards
		$scope.giftcards = null;

		//Variable if a button is clicked
		$scope.clicked = false;

		//Amoutn entered
		$scope.amount = parseInt(0).toFixed(2);

		//Amount that is an unmodified int
		$scope.trueAmount = 0;

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

		//Holds the table layout for the dynamic ng-repeat table
		$scope.tableLayout = [
				[1,2,3],
				[4,5,6],
				[7,8,9]
		];

		// Find a list of Giftcards
		$scope.find = function() {
			//$scope.giftcards = Giftcards.query();

			//FOr testing, hardcoding scope giftcards
			$scope.giftcards =
			[
				{
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
					to: "John",
					amt: "10000",
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
			return (parseInt(total) / 100).toFixed(2);
		}

		//Function to switch the value of pressed
		$scope.pressButton = function (i)
		{
			//Clicked is now true
			$scope.clicked = true;

			$scope.pressed = i;

			//Set clicked button styling
			event.currentTarget.style.backgroundPositionY = '-100px';

			//Ignore values that are negative one, since thye simply disable our selectors
			//Also checking for the number of digits
			//Using / 100 to keep everything in ints
			//Also, do not allow zero to be press if no trailing non zero in the stack
			if(i != -1)
			{
				//Add to our amount from right to left, so just concatanate to the string
				//push i onto the queue
				//Increase stack size,
				//only if it is less than our max digits, 5
				//Push onto the stack, only if the button isnt zero
				//when the stack size is zero
				if(i != 0 || $scope.stackSize != 0)
				{
					$scope.digitStack.push(i);
					$scope.stackSize++;
				}

				//Our final answer
				var answer = 0;

				//create a temp stack we can peek
				var tempStack = $scope.digitStack.slice();

				//Loop to put in our places
				for(var j = $scope.stackSize; j > 0; --j)
				{
					//Get the value
					var pop = tempStack.pop();

					//add it to the amount by multipling it by ten
					//by a certain power
					var add = pop * Math.pow(10, ($scope.stackSize - j));

					//Now add the amount to amount
					answer = answer + add;
				}

				//Get our total value
				var total = parseInt($scope.totalValue());
				//Also, check if the amount is greater than our maxes
				if(answer > total)
				{
					//Only show one warning at a time
					if($scope.warning)
					{
						$scope.warning = false;
					}
					$scope.totalWarning = true;

					//Make the amount total value
					$scope.trueAmount = 0;
					$scope.amount = (parseInt(0) / 100).toFixed(2);

					//Make the stack the empty
					$scope.digitStack = [];
					$scope.stackSize = 0;

					//Just going to make it empty, to avoid user confusion
					// var totalString = (total).toString();
					//
					// for(i = 0; i < totalString.length; ++i)
					// {
					// 	$scope.digitStack.push(totalString[i]);
					// }

				}
				else if(answer / 100 > 500)
				{
					//Only show one warning at a time
					if($scope.totalWarning)
					{
						$scope.totalWarning = false;
					}
					$scope.warning = true;

					//Make the amount 0
					$scope.trueAmount = 0;
					$scope.amount = (parseInt(0) / 100).toFixed(2);

					//Make the stack empty
					$scope.digitStack = [];
					$scope.stackSize = 0;


					//Just going to make it empty, to avoid user confusion
					// // $scope.digitStack.push(5);
					// // $scope.digitStack.push(0);
					// // $scope.digitStack.push(0);
					// // $scope.digitStack.push(0);
					// // $scope.digitStack.push(0);
					//
					// //Check if our stack is too large
					// while($scope.stackSize > 5)
					// {
					// 	$scope.digitStack.pop;
					// 	$scope.stackSize--;
					// }
				}
				else
				{
					//Nothing wrong, show!
					$scope.trueAmount = answer;
					$scope.amount = (parseInt(answer) / 100).toFixed(2);
				}
			} else {
				//Set button styling back to original
				event.currentTarget.style.backgroundPositionY = '0px';
			}
		}

		//function call when the back button is pressed
		$scope.backSpace = function()
		{
			//Pop from our stack, and decrease our stack size
			if($scope.stackSize > 0)
			{
				$scope.digitStack.pop();
				$scope.stackSize--;
			}

			//Our final answer
			var answer = 0;

			//create a temp stack we can peek
			var tempStack = $scope.digitStack.slice();

			//Loop to put in our places
			for(var i = $scope.stackSize; i > 0; --i)
			{
				//Get the value
				var pop = tempStack.pop();

				//add it to the amount by multipling it by ten
				//by a certain power
				var add = pop * Math.pow(10, ($scope.stackSize - i));

				//Now add the amount to amount
				answer = answer + add;
			}

			//Nothing wrong, show!
			$scope.amount = parseInt(answer) / 100;
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

	}
]);

'use strict';
// Giftcards controller
angular.module('giftcards')
  .controller('GiftcardsController', ['$scope', '$http', '$stateParams', '$location', '$window', 'Authentication', 'Giftcards', 'processPaymentService', '$log', '$q',
    'OccasionService',
    function($scope, $http, $stateParams, $location, $window, Authentication, Giftcards, processPaymentService, $log, $q, OccasionService) {

      //Switch overlay off
      document.getElementById('darkerOverlay').style.display = "none";


      $scope.authentication = Authentication;

      $scope.gc = new Giftcards();

      $scope.prices = [2, 5, 10, 25, 50, 75, 100];
      // flag to show other section.
      $scope.setShowPage = function() {
        $scope.showPageFlag = !$scope.showPageFlag;
      };

      $scope.logGC = function() {
          console.log($scope.gc);
      }

      $scope.activeField = null;
      $scope.setActiveField = function(fieldId) {
        if($scope.activeField != null){
            $window.document.getElementById($scope.activeField).style.backgroundColor = 'transparent';
        }
        $scope.activeField = fieldId;
        $window.document.getElementById($scope.activeField).style.backgroundColor = "white";
      };

      //Flags for various things.

      $scope.priceSelectionFlag = true;
      $scope.showPageFlag = true;

      $scope.flipCardFlag = false;

      $scope.flipCard = function() {
        $scope.flipCardFlag = false;
      };

      $scope.setAmount = function(anAmount) {
        $scope.gc.amount = anAmount;
        $scope.priceSelectionFlag = false;
        $scope.showBackgroundFlag = false;
      };

      // flag for occasion Selector
      $scope.occasionSelectionFlag = true;
      // flag for send selection flag
      $scope.sendSelectionFlag = true;


      $scope.setBack = function() {
        $scope.priceSelectionFlag = true;
      };
      $scope.setOccasionBack = function() {
        $scope.occasionSelectionFlag = true;
      };
      $scope.isAmount = function(checkAmount) {
        return $scope.gc.amount === checkAmount; // boolean
      };


      /**********
       * Occasion
       **********/
      // import occasions object from OccasionService
      $scope.occasions = OccasionService;

      // set default occasion icon to display
      $scope.occasions.selectedIcon = 'modules/giftcards/img/occasion-custom-icon-blk.png';

      $scope.occasions.charsLeft = 100;
      var occCharLimit = 100; // no need to include the character limit inside $scope

      $scope.setOccasion = function(occasion) {
        // change occasion text only if a new occasion is selected
        $scope.occasionSelectionFlag = false;
        $scope.showBackgroundFlagFour = true;

        if ($scope.gc.Icon !== occasion.name) {
          $scope.gc.occasion = occasion.text;
          $scope.gc.Icon = occasion.name;
          $scope.occasions.selectedIcon = occasion.images.selected;
        }
        //$scope.limitOccText(); // limit occasion text to 100 characters
      };
      /**********
       * Date
       **********/
      // set default img
      $scope.dateTypeImg = 'modules/giftcards/img/send-today-blk.png';

      $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      };
      $scope.setDateType = function(type) {
        $scope.sendSelectionFlag = true;
        if (type === 'today')
          $scope.dateTypeImg = 'modules/giftcards/img/send-today-blk.png';
        else if (type === 'on-date')
          $scope.dateTypeImg = 'modules/giftcards/img/send-on-date-blk.png';

      };
      $scope.updateCreditCardImg = function() {
        var type = $.formance.creditCardType($scope.formData.CreditCardNumber);

        var acceptedTypes = ['amex', 'discover', 'mastercard', 'visa'];

        if (acceptedTypes.indexOf(type) !== -1)
          $scope.cardTypeImg = 'modules/giftcards/img/cc-' + type;
        else
          $scope.cardTypeImg = 'modules/giftcards/img/cc-basic';

        var filledIn = $('#creditcardnumbercontainer').hasClass('filledIn');
        if (filledIn)
          $scope.cardTypeImg += '-wht.png';
        else
          $scope.cardTypeImg += '-blk.png';
      };

      $scope.create = function() {
        var giftcard = new Giftcards($scope.gc);
        var payload = {
          card: $scope.cc
        };
        var callback = function(status, response) {
          if (response.error) {
            $scope.error = response.error.message;
          } else {
            giftcard.stripeCardToken = response.id;
            return processPaymentService.findOrCreateUser(giftcard.mobileNumberOfRecipient, giftcard.giftRecipientFirstName)
              .then(function anotherHandler(response) {
                giftcard.spenderofgiftcard = response.data._id;
                return giftcard.$save();
              }).then(function yetAnotherHanlder(response) {
                return $location.path('/giftcards');
              }).catch(function errHandler(errorResponse) {
                $scope.error = errorResponse.error.message;
              });
          }
        };
        Stripe.card.create(payload, callback);
      };


      // Remove existing Giftcard
      $scope.remove = function(giftcard) {
        if (giftcard) {
          giftcard.$remove();

          for (var i in $scope.giftcards) {
            if ($scope.giftcards[i] === giftcard) {
              $scope.giftcards.splice(i, 1);
            }
          }
        } else {
          $scope.giftcard.$remove(function() {
            $location.path('giftcards');
          });
        }
      };

      // Update existing Giftcard
      $scope.send = function() {
        //1. before we can send the giftcard to the user we need the user's id.
        //2. save the giftcard to the that user's id.
        var giftcard = new Giftcards({
          giftRecipientFirstName: $scope.gc.to,
          amount: $scope.gc.amount,
          mobileNumberOfRecipient: $scope.gc.phoneNumber,
          merchant: $scope.gc.code,
          spenderofgiftcardUserName: $scope.gc.phoneNumber,
          message: $scope.gc.occasion
          //districtNumber: 'number'
        });

        giftcard.$save(function() {
          $location.path('giftcards/');
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };


      // Update existing Giftcard
      $scope.update = function() {
        var giftcard = $scope.giftcard;

        giftcard.$update(function() {
          $location.path('giftcards/' + giftcard._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      /*Moved into list gift card controller
      // Find a list of Giftcards
      $scope.find = function() {
        //$scope.giftcards = Giftcards.query();

        //FOr testing, hardcoding scope giftcards
        $scope.giftcards =
        [
            {
              to: "john",
              amt: "100000000000",
              mobileNumberOfRecipient: "5625555555",
              merchant: "xxxxx",
              from: 'username',
              message: "hi",
              districtNumber: 'number'
            },
            {
                to: "john",
                amt: "100000000000",
                mobileNumberOfRecipient: "5625555555",
                merchant: "xxxxx",
                from: 'username',
                message: "hi",
                districtNumber: 'number'
            }
        ]
    }
    */

      // Find existing Giftcard
      $scope.findOne = function() {
        $scope.giftcard = Giftcards.get({
          giftcardId: $stateParams.giftcardId
        });
      };

      //Mask for translating and validating phone numbers
      $scope.mask = function(f){
          f = $window.document.getElementById(f);
          $scope.clique_input_phonenumber_validity = true;
          var tel='(';
          var val =f.value.split('');
          for(var i=0; i<val.length; i++){
              if( val[i]==='(' ){
                  val[i]='';
              }
              if( val[i]===')' ){
                  val[i]='';
              }
              if( val[i]==='-' ){
                  val[i]='';
              }
              if( val[i]==='' ){
                  val[i]='';
              }
              if(isNaN(val[i])){
                  $scope.clique_input_phonenumber_validity = false;
              }
          }
          //
          for(i=0; i<val.length; i++){
              if(i===3){ val[i]=val[i]+')'; }
              if(i===7){ val[i]=val[i]+'-'; }
              tel=tel+val[i];
          }
          f.value=tel;
      }
    }
  ]);

'use strict';

angular.module('giftcards').controller('ListGiftCardsController', ['$scope',
	function($scope) {

		//Switch overlay off
		document.getElementById('darkerOverlay').style.display = "none";

		//Initialize scope.giftcards
		$scope.giftcards = null;

		// Find a list of Giftcards
		$scope.find = function() {
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

		//function to fomat a giftcard value for us
		$scope.giftValue = function(amt)
		{
			//Return the total value as a formatted string
			return (parseInt(amt) / 100).toFixed(2);
		}
	}
]);

'use strict';

angular.module('giftcards').controller('RecipientController', ['$scope', '$stateParams',
	function($scope, $stateParams) {

		//Switch overlay off
      	document.getElementById('darkerOverlay').style.display = "none";

		//Initialize scope.giftcards
		$scope.giftcards = null;

		//Src to our merchant imgaes
		$scope.merchantImages =
		[
			"/modules/giftcards/img/dolys-delectables-crop.jpg",
			""
		]

		// Find a list of Giftcards
		$scope.find = function() {
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
			var giftcard;
			for (giftcard in $scope.giftcards){
				if($scope.giftcards[giftcard]._id == $stateParams.giftcardId){
					$scope.giftcard = $scope.giftcards[giftcard];
					break;
				}
			}
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

		//function to fomat a giftcard value for us
		$scope.giftValue = function(amt)
		{
			//Return the total value as a formatted string
			return (parseInt(amt) / 100).toFixed(2);
		}
	}
]);

'use strict';

angular.module('giftcards').controller('SelectMerchantController', ['$scope', '$window',
	function($scope, $window) {

		//Switch overlay off
		document.getElementById('darkerOverlay').style.display = "none";

		//Initialize scope.giftcards
		$scope.giftcards = null;


		$scope.merchants = [{
			area: "4th Street Retro Row",
			name: "Goldies On 4th",
			address: "2106 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Aji Peruvian Cuisine",
			address: "2308 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "P3 Artisan Pizza",
			address: "2306 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "The Social List",
			address: "2105 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Lola's",
			address: "2030 E 4th St, Long Beach, CA"
		},{
			area: "4th Street Retro Row",
			name: "Portfolio's Coffee",
			address: "2300 E 4th St, Long Beach, CA"
		}]


		// Find a list of Giftcards
		$scope.find = function() {
			//$scope.giftcards = Giftcards.query();

			//FOr testing, hardcoding scope giftcards
			$scope.giftcards =
			[
				{
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
					to: "John",
					amt: "10000",
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
			return (parseInt(total) / 100).toFixed(2);
		}
	}
]);

'use strict';

angular.module('giftcards').controller('TiltScreenController', ['$scope', '$location',
	function($scope, $location)
	{

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

		//Function to go back to selecting merchants
		$scope.goTo = function(place)
		{
			//Save our final amount if the path is to pay
			if(place == "/#!/")
			{

			}

			$location.path(place);
		}
	}
]);

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

'use strict';
angular.module('giftcards').directive('datePicker', [function() {
  return {
    restrict: 'A',

     link: function(scope, element) {
			$(element).datepicker();
    //   element.pickadate({
    //     min: new Date(), // minimum date = today
    //     max: +365, // maximum date = 1 year from now
    //     clear: '', // disable 'Clear' button
    //     format: 'Sen!d on mmm. dd, yyyy', // use '!' to escape any "rule" characters
    //     onSet: function() {
    //       var date = this.get('select', 'yyyy-mm-dd'); // 'this' refers to element.pickadate()
    //       scope.$apply(function() {
    //         scope.formData.Date = date;
    //       });
    //     },
    //     onClose: function() {
    //       element.blur(); // remove focus from input element
    //     }
    //   });
		//
    //   var picker = element.pickadate('picker');
		//
    //   // when "Send Today" is clicked, set picker to Today, but don't open the popup
    //   $('#sendToday').on('click', function(event) {
    //     picker.set('select', new Date()); // set picker to today --> triggers onSet()
    //   });
		//
    //   // when "Send On Date" is clicked, remove 'nextInput' class and open picker
    //   $('#sendOnDate').on('click', function(event) {
    //     $('#clique_date_wrapper').removeClass('nextInput');
    //     picker.open();
    //     event.stopPropagation(); // stop click event outside of input from triggering picker.close()
    //   });
     }
  };
}]);

'use strict';

angular.module('giftcards').directive('phoneInput', [function($filter, $q, tel) {
	return {
		require: 'ngModel',

		link: function($scope, $element, $attrs, ngModelCtrl) {

			var deferred = $q.defer();

			var listener = function() {
				var value = $element.val().replace(/[^0-9]/g, '');
				$element.val($filter('tel')(value, false));
			};
		 // This runs when we update the text field
		 ngModelCtrl.$parsers.push(function(viewValue) {
			return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
		 });
		 // This runs when the model gets updated on the scope directly and keeps our view in sync
		 ngModelCtrl.$render = function() {
				$element.val($filter('tel')(ngModelCtrl.$viewValue, false));
			};

			$element.bind('change', listener);
      $element.bind('keydown', function(event) {

				var key = event.keyCode;
            // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
            // This lets us support copy and paste too
            if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
              return;
            }
           $browser.defer(listener); // Have to do this or changes don't get picked up properly
          });

          $element.bind('paste cut', function() {
            $browser.defer(listener);
          });
        }
      };
    }]);

'use strict';

angular.module('giftcards').directive('myTouchstart', [function() {
	    return function(scope, element, attr) {
	        element.on('touchstart', function(event) {
	            scope.$apply(function() {
	                scope.$eval(attr.myTouchstart);
	            });
	        });
	    };
	}]).directive('myTouchend', [function() {
	    return function(scope, element, attr) {

	        element.on('touchend', function(event) {
	            scope.$apply(function() {
	                scope.$eval(attr.myTouchend);
	            });
	        });
	    };
	}]);

'use strict';

angular.module('giftcards').filter('tel', [
	function() {

		return function(tel) {

			console.log(tel);

			if (!tel) { return ''; }

			var value = tel.toString().trim().replace(/^\+/, '');

			if (value.match(/[^0-9]/)) {
				return 'tel filter: ' + tel;
			}

			var country, city, number;
			switch (value.length) {
					case 1:
					case 2:
					case 3:
							city = value;
							break;

					default:
							city = value.slice(0, 3);
							number = value.slice(3);
			}
			if(number){
					if(number.length>3){
							number = number.slice(0, 3) + '-' + number.slice(3,7);
					}
					else{
							number = number;
					}

					return ('(' + city + ') ' + number).trim();
			}
			else{
					return '(' + city;
			}
		};
	}
]);

'use strict';

//giftcards service used to communicate Giftcards REST endpoints
angular.module('giftcards').factory('Giftcards', ['$resource',
	function($resource) {
		return $resource('giftcards/:giftcardId', { giftcardId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

//Ocasion service for populating
'use strict';

// Occasion service used to communicate to Giftcard Controller, just for
// populating the occasions in the front end.
angular.module('giftcards').factory('OccasionService', function(){
  var occasions = [
      {
        name: 'birthday',
        images: {
          normal: 'modules/giftcards/img/occasion-birthday-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-birthday-icon-blk.png'
        },
        alt: 'Birthday',
        text: 'Variety is the spice of life. So I’m giving you the gift of choice!'
      },
      {
        name: 'anniversary',
        images: {
          normal: 'modules/giftcards/img/occasion-anniversary-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-anniversary-icon-blk.png'
        },
        alt: 'Anniversary',
        text: 'You remind me of time itself for you are my Past, Future, and Forever. Happy Anniversary!'
      },
      {
        name: 'love',
        images: {
          normal: 'modules/giftcards/img/occasion-love-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-love-icon-blk.png'
        },
        alt: 'I Love You',
        text: 'I Iove you for all that you are, all you have been, and all you\'re yet to be.'
      },
      {
        name: 'getwell',
        images: {
          normal: 'modules/giftcards/img/occasion-getwell-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-getwell-icon-blk.png'
        },
        alt: 'Get Well',
        text: 'I look forward to your speedy recovery. Get well soon!'
      },
      {
        name: 'congrats',
        images: {
          normal: 'modules/giftcards/img/occasion-congrats-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-congrats-icon-blk.png'
        },
        alt: 'Congrats',
        text: 'Spread joy. Chase your wildest dreams. Congratulations!'
      },
      {
        name: 'wedding',
        images: {
          normal: 'modules/giftcards/img/occasion-wedding-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-wedding-icon-blk.png'
        },
        alt: 'Wedding',
        text: 'Falling in love is easy. Staying in love is AMAZING. Congrats on your marriage!'
      },
      {
        name: 'baby',
        images: {
          normal: 'modules/giftcards/img/occasion-baby-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-baby-icon-blk.png'
        },
        alt: 'Baby',
        text: 'Congratulations on the birth of your child!'
      },
      {
        name: 'sympathy',
        images: {
          normal: 'modules/giftcards/img/occasion-sympathy-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-sympathy-icon-blk.png'
        },
        alt: 'Sympathy',
        text: 'Our collective hearts are heavy with sympathy.'
      },
      {
        name: 'thankyou',
        images: {
          normal: 'modules/giftcards/img/occasion-thankyou-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-thankyou-icon-blk.png'
        },
        alt: 'Thank You',
        text: 'You’re the best! You deserve some retail therapy.'
      },
      {
        name: 'custom',
        images: {
          normal: 'modules/giftcards/img/occasion-custom-icon-wht.png',
          selected: 'modules/giftcards/img/occasion-custom-icon-blk.png'
        },
        alt: 'Custom',
        text: 'If you want to be loved for who you are, just be yourself.'
      }
    ];
    return occasions;
 });

'use strict';
// this will handle sequence that leads up to a giftcard being purchased
// Payment Service for managing calls to backend API
angular.module('giftcards')
  .service('processPaymentService', ["$q", "$http", function($q, $http) {
    return {
      // should return a token
      //   var aPhoneNumber = this.mobileNumberOfRecipient,
      tokenizeCard: function(data) {

        Stripe.tokens.create({
          card: {
          //package  <-  un-package
          number: '4242424242424242',
          //this.number,
          exp_month: 4,
          //this.exp_month,
          exp_year: 2020,
          //this.exp_year,
          cvc: '123'
            //this.c1vc
        }
      });


        // TODO: add in some way to tell if user has token
        // if user has token then use that token and don't create one.
        // var dfd = $q.defer();
        // dfd.resolve(

        // );
        // return dfd.promise;

        // TODO: add in a way to check if the user has a card token already or not, then don't tokenize if they already have one.
        // var error;
        // if (!Stripe.card.validateCardNumber(number)) {
        //   error = buildError('number', 'Your card number is incorrect.');
        // } else if (!Stripe.card.validateExpiry(exp_month, '20' + exp_year)) {
        //   error = buildError('expiry', 'Your expiration date is incorrect.');
        // } else if (!Stripe.card.validatecvc(cvc)) {
        //   error = buildError('cvc', 'Your cvc is incorrect');
        // }
        // if (error) {
        //   error_callback(error);
        //   return;
        // }
        //  var callback = function(status, response) {
        //    // what ever errors i get I want to send back to the controller to display on the view.
        //   if (response.error) {
        //     error_callback(buildError('server', response.error.message));
        //   }
        //   else {
        //     // Invoke server call to process payment
        //     $http.post('/users/' + user_id + '/subscriptions', {
        //       user_id: user_id,
        //       token: response.id,
        //       product_id: product_id
        //       }).success(function(data){
        //
        //       subscriptionService.verifyPayment(user_id, 'UserPass', success_callback, error_callback);
        //
        //     }).error(function() {
        //       if(error_callback) {
        //         error_callback(buildError('server', "There was an error processing your payment. Please try again"));
        //       }
        //     });
        //   }
        // };

        // save the token to the user's model.
        // that way when the user comes back to buy a card if they have a token,
        // we can pre-populate the form with the info from the token,
        // should return a user id
      },

      sendGiftCard: function(giftcard) {
        var dfd = $q.defer();
        dfd.resolve(
          $http.post('/giftcards', giftcard)
        );
        return dfd.promise;
      },

      // this probably should be another service but, i'm not sure.
      // if you are looking at this in the future sorry, i'm just learning how to this. @JamesHall03/24/2014
      
      findOrCreateUser: function(mobileNumber, firstName) {
          var dfd = $q.defer();
          dfd.resolve(
            $http.post('/authfindOrCreateUser', {
              firstName: firstName,
              username: mobileNumber
            }));
          return dfd.promise;
          // need to turn this into a promise
        }
        // take in the mobile number and just send it to the backend and expect back a user id.
    };
  }]);

'use strict';
angular.module('giftcards').service('Processpayments', [
	function() {
		// Processpayments service logic
		// ...
		
		// Public API
		return {
			someMethod: function() {
				return true;
			}
		};
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				// And redirect to the index page
				$location.path('/giftcards/create');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				// And redirect to the index page
				$location.path('/giftcards/create');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/authforgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/authreset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};
		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};
		return _this._data;
	}
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);