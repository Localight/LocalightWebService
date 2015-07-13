'use strict';
// Giftcards controller
angular.module('giftcards')
  .controller('GiftcardsController', ['$scope', '$http', '$stateParams', '$location', '$window', 'Authentication', 'Giftcards', 'processPaymentService', '$log', '$q',
    'OccasionService',
    function($scope, $http, $stateParams, $location, $window, Authentication, Giftcards, processPaymentService, $log, $q, OccasionService) {

      //Switch overlay off
      document.getElementById('darkerOverlay').style.display = "none";

      //Setting our stripe key
      Stripe.setPublishableKey('pk_test_XHrjrZeUDNIITwzqrw9OEpQG');

      //Keeping track of stripe verified fields
      $scope.cardIndex = 0;
      $scope.cardValidated = false;
      $scope.numberValidated = false;
      $scope.dateValidated = false;
      $scope.cvcValidated = false;
      $scope.zipValidated = false;

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



      //Stripe icons for cards
      //Default, Visa, Mastercard, Amex, Discover
      $scope.cardIcons =
      [
          "/modules/giftcards/img/cc-basic-blk.png",
          "/modules/giftcards/img/cc-visa-blk.png",
          "/modules/giftcards/img/cc-mastercard-blk.png",
          "/modules/giftcards/img/cc-amex-blk.png",
          "/modules/giftcards/img/cc-discover-blk.png"
      ]

      //Stripe verification fileds
      $scope.validateCardNumber = function ()
      {
          //Concatante the giftcard number together
          var input1 = document.getElementById("clique_input_creditcardnumber1");
          var input2 = document.getElementById("clique_input_creditcardnumber2");
          var input3 = document.getElementById("clique_input_creditcardnumber3");
          var input4 = document.getElementById("clique_input_creditcardnumber4");

          //concatante the values, using dashes so they wont add together, and stripe supports
          var cardNumber = input1.value + "-" + input2.value + "-" + input3.value+ "-" + input4.value;

          $scope.numberValidated = Stripe.card.validateCardNumber(cardNumber);

          //Also we should set what card type we have
          var cardType = Stripe.card.cardType(cardNumber);

          //Now set our array index for card type
          if(cardType.indexOf("Visa") > -1)
          {
              $scope.cardIndex = 1;
          }
          else if(cardType.indexOf("MasterCard") > -1)
          {
              $scope.cardIndex = 2;
          }
          else if(cardType.indexOf("American Express") > -1)
          {
              $scope.cardIndex = 3;
          }
          else if(cardType.indexOf("Discover") > -1)
          {
              $scope.cardIndex = 4;
          }
          //It is unkown go back to default
          else
          {
              $scope.cardIndex = 0;
          }

          //Now see if the card is validated
          $scope.validateCard();
      }

      $scope.validateDate = function ()
      {
          //Concatante the giftcard number together
          var input1 = document.getElementById("clique_input_expiry_m");
          var input2 = document.getElementById("clique_input_expiry_y");

          $scope.dateValidated = Stripe.card.validateExpiry(input1.value, input2.value);

          //Now see if the card is validated
          $scope.validateCard();
      }

      $scope.validateCVC = function ()
      {
          //get the input
          var input1 = document.getElementById("clique_input_cvv");

          $scope.cvcValidated = SStripe.card.validateCVC(input1.value);

          //Now see if the card is validated
          $scope.validateCard();
      }

      $scope.validateZip = function ()
      {
          //get the input
          var input1 = document.getElementById("clique_input_cvv");

          //Simply check if there are 5 digits
          if(input1.value.length > 4)
          {
              $scope.zipValidated = true;
          }
          else
          {
              $scope.zipValidated = false;
          }

          //Now see if the card is validated
          $scope.validateCard();
      }

      $scope.validateCard = function()
      {
          if($scope.numberValidated && $scope.dateValidated
              && $scope.cvcValidated && $scope.zipValidated)
          {
              $scope.cardValidated = true;
          }
          else
          {
              $scope.cardValidated = false;
              $scope.cardType = "";
          }
      }





    }
  ]);
