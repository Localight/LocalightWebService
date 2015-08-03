'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:CreategiftcardCtrl
 * @description
 * # CreategiftcardCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('CreategiftcardCtrl', function ($scope, $http, $routeParams, $location, $window, $timeout,
  $log, $q, $cookies, OccasionService, Users, Join, Giftcards, $document) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*
        Commented out:
        Giftcards
        Authentication

        Added Back In:
        OccasionService
    */


    //Switch overlay off
  document.getElementById('darkerOverlay').style.display = "none";

  //Keeping track of stripe verified fields
  $scope.cardIndex = 0;
  $scope.cardValidated = false;
  $scope.numberValidated = false;
  $scope.dateValidated = false;
  $scope.cvcValidated = false;
  $scope.zipValidated = false;

  //Keeping track of the backend
  $scope.backendError = false;
  $scope.backendRes = "";

  /* James Node Backend
  $scope.user = AuthTwilio.login({"token": $routeParams.token},
  function(){
      console.log($scope.user);
  });
  */

  //Get our session token cookie, and store it in the cookie store
  var sessionToken = $routeParams.token;
  $cookies.put("sessionToken", sessionToken);

  //Not using Authentication service
  //$scope.authentication = Authentication;

  //$scope.gc = new Giftcards();

  $scope.prices = [2, 5, 10, 25, 50, 75, 100];

  //Function to scroll to the bottom of our page
  $scope.scrollToBottom = function()
  {
      //Wait a second to scroll so element can load and show
      $timeout(function() {
          //Use smooth scroll to scroll to the bottom
          var bottom = angular.element(document.getElementById('scrollDiv'));
          //Scrol to the bottom div, with 0 offset, in 1 second, with inout easing fucntion
          $document.scrollToElement(bottom, 0, 1000, function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 });
      }, 5);
  }

  //We need to set the primary and secondary input
  $scope.activeField = null;
  $scope.setActiveField = function(fieldId) {

    if($scope.activeField != null){
        $window.document.getElementById($scope.activeField).style.backgroundColor = 'transparent';
    }

    //Check if it is the occasion wrapper, if it is, we need to turn white into transparent
    if(fieldId.indexOf("clique_occasion_wrapper") > -1)
    {
        //it is occasion wrapper handle here
        //Check if the active field is already occasion wrapper
        if($scope.occasionSelectionFlag)
        {
            //make the occasion transparent again
            $scope.activeField = fieldId;
            $window.document.getElementById($scope.activeField).style.backgroundColor = 'transparent';
        }
        else
        {
            //make the occasion white
            $scope.activeField = fieldId;
            $window.document.getElementById($scope.activeField).style.backgroundColor = "white";
        }
    }
    else
    {
        $scope.activeField = fieldId;
        $window.document.getElementById($scope.activeField).style.backgroundColor = "white";
    }
  };
  //start the first field highlightd
  $scope.setActiveField('clique_to');

  //Our secondary field
  $scope.secondaryField = null;
  $scope.secondaryIndex = 0;
  $scope.inputFields = [
      "clique_amt_selection",
      "clique_from",
      "clique_code",
      "clique_occasion_wrapper",
      "clique_date_selection",
      "creditcardinfo"
  ]

  $scope.setSecondaryField = function(next)
  {
      if (next >= $scope.secondaryIndex)
      {
          $scope.secondaryIndex = next;
          $scope.secondaryField = $scope.inputFields[next];
      }
      $window.document.getElementById($scope.secondaryField).style.backgroundColor = "rgba(255, 255, 255, 0.35)";
      $scope.scrollToBottom();
  }
  //set our secondary field to 0
  $scope.setSecondaryField(0);

  //Scroll to the botton when a field appears, this specifaically fixes the credit card not scrolling bug
  $scope.$watch('giftcardForm.clique_date_selection.$valid', function(newValue, oldValue) {
   if (newValue)
   {
       //Focus on the credit card number
       $window.document.getElementById('clique_date_selection').blur();
       //Scroll to the bottom
       $scope.scrollToBottom();
   }
});


  //Flags for various things.

  $scope.priceSelectionFlag = true;
  $scope.showPageFlag = true;

  $scope.flipCard = function() {
    //$scope.flipCardFlag = true;

    //Add the classes to the front and back
    var frontCard = $window.document.getElementById("front");
    var backCard = $window.document.getElementById("back");

    frontCard.className = frontCard.className + " flipped";
    backCard.className = backCard.className + " flipped";

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
  /*
  $scope.isAmount = function(checkAmount) {
    return $scope.gc.amount === checkAmount; // boolean
  };
  */

  /**********
   * Code
   **********/

   //Set hiding the card to false until we finish the code
   $scope.hideCard = false;
   //Boolean if the code is at it's maximum value
   $scope.codeMax = false;

   //Validate our code length
   $scope.codeValidate = function(id, event, maxlength)
   {
            //Grab our element
           var element = $window.document.getElementById(id);
           //get our element length
           var len = element.value.toString().length + 1;
           //get the max length we assigned to it
           var max = element.maxLength;

           //Our condition to check if it is a number
           var cond = (46 < event.keyCode && event.keyCode < 58);

           //Check if we met our condition and our length is good
           if(len >= maxlength)
           {
               $scope.hideCard = true;
               $scope.codeMax = true;

               //Scroll to the bottom for the occasion
               $scope.scrollToBottom();
           }
           else
           {
               $scope.codeMax = false;
           }

           if (!(cond && len <= max))
           {
               event.preventDefault();
               return false;
           }
   }

   //temporary function for getting a merchant name for a code
   $scope.getMerchantName = function()
   {
       //get our code value here
       var element = $window.document.getElementById('clique_input_code');
       var code = element.value.toString();

       //do stuff to return the correct name
       return "Doly's Delectables"
   }


  /**********
   * Occasion
   **********/
  // import occasions object from OccasionService
  $scope.occasions = OccasionService;
  //The occasion Id for our giftcard
  $scope.occasionId = 0;

  // set default occasion icon to display
  $scope.occasions.selectedIcon = '../images/occasion-custom-icon-blk.png';

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
      //Also set our occasion ID for our giftcard
      $scope.occasionId = occasion.images.iconId;
    }
    //$scope.limitOccText(); // limit occasion text to 100 characters
  };


  /**********
   * Date
   **********/
  // set default img
  $scope.dateTypeImg = '../images/send-today-blk.png';

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
      $scope.dateTypeImg = '../images/send-today-blk.png';
    else if (type === 'on-date')
      $scope.dateTypeImg = '../images/send-on-date-blk.png';

  };
  $scope.updateCreditCardImg = function() {
    var type = $.formance.creditCardType($scope.formData.CreditCardNumber);

    var acceptedTypes = ['amex', 'discover', 'mastercard', 'visa'];

    if (acceptedTypes.indexOf(type) !== -1)
      $scope.cardTypeImg = '../images/cc-' + type;
    else
      $scope.cardTypeImg = '../images/cc-basic';

    var filledIn = $('#creditcardnumbercontainer').hasClass('filledIn');
    if (filledIn)
      $scope.cardTypeImg += '-wht.png';
    else
      $scope.cardTypeImg += '-blk.png';
  };

  /*
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

  // Find existing Giftcard
  $scope.findOne = function() {
    $scope.giftcard = Giftcards.get({
      giftcardId: $routeParams.giftcardId
    });
  };

  */

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

  //Credit card Verification

  //Stripe icons for cards
  //Default, Visa, Mastercard, Amex, Discover
  $scope.cardIcons =
  [
      "../images/cc-basic-blk.png",
      "../images/cc-visa-blk.png",
      "../images/cc-mastercard-blk.png",
      "../images/cc-amex-blk.png",
      "../images/cc-discover-blk.png"
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

      $scope.cvcValidated = Stripe.card.validateCVC(input1.value);

      //Now see if the card is validated
      $scope.validateCard();
  }

  $scope.validateZip = function ()
  {
      //get the input
      var input1 = document.getElementById("clique_input_zip");

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

  $scope.validateEmail = function()
  {
      //get the email
      var email = $scope.gc.email;

      //check if the email has an @ sign
      if(email.indexOf("@") > -1)
      {
          //If it does, get a sub string after that, and check for a period
          if(email.substring(email.indexOf("@"))
          .indexOf(".") > -1)
          {
              //if it exists return true
              return true;
          }
          else {
              return false;
          }
      }
      else {
          return false;
      }
  }


  /*
    STRIPE
    ------
    ------
  */

  //Setting our stripe key
  Stripe.setPublishableKey('pk_test_XHrjrZeUDNIITwzqrw9OEpQG');

  //Our stripe token for their card
  $scope.stripeToken;
  $scope.tokenizing = false;
  $scope.tokenizeFailure = false;


  // finish the form, see if anything else is needed
  $scope.tokenizeInfo = function()
  {
      //disable the submit button
      $scope.tokenizing = true;

      //Collect the credit card form info
      $scope.finalCard = {};

      //First concatanate the number, use dashes to keep things from adding
      var cardNumber = $scope.cc.number1 + "-" +  $scope.cc.number2 + "-" + $scope.cc.number3 + "-" + $scope.cc.number4;
      //Add card number to our finalCard
      $scope.finalCard.number = cardNumber;

      //Add the cvc
      $scope.finalCard.cvc = $scope.cc.cvc;

      //Add the month and year (used with an undescore)
      $scope.finalCard.exp_month = $scope.cc.ExpiryM;
      $scope.finalCard.exp_year = $scope.cc.ExpiryY;

      //Now send to stripe to be tokenized
      Stripe.card.createToken($scope.finalCard, $scope.stripeResponseHandler);
  };

  $scope.stripeResponseHandler = function (status, response)
  {
      if (response.error)
      {
          //Inform the user
          $scope.tokenizeFailure = true;

      }
      else
      {
         //Tokenizing was a success!
         $scope.tokenizeFailure = false;

        //Get the token to be submitted later, after the second page
        // response contains id and card, which contains additional card details
        $scope.stripeToken = response.id;

        //Show the next page
        $scope.showPageFlag = !$scope.showPageFlag;
      }

      //Force the change to refresh, we need to do this because I
      //guess response scope is a different scope and has to be
      //forced or interacted with
      $scope.$apply();


      //We are no longer tokenizing
      $scope.tokenizing = false;

  };


  //Finally SUBMIT EVERYTHING!

  $scope.submitGiftcard = function()
  {
      //Creating the users Json
      var userJson = {
          "sessionToken" : sessionToken,
          "name" : $scope.gc.from,
          "email" : $scope.gc.email
      };

      //If it is successful, Update the spending user
      var updateUser = Users.update(userJson, function () {
          if(updateUser.errorid)
          {
              $scope.backendError = true;
              $scope.backendRes = updateUser.msg;
              return;
          }
          else {
              //First, fix the formatting on the phone
              //This will remove all special characters from the string

              var formattedPhone = $scope.gc.phoneNumber.replace(/[^a-zA-Z0-9]/g, '');

              //Also, we need to convert our amount into integers
              var intAmount = $scope.gc.amount * 100;

              //Create a giftcard
              var newGiftcardJson = {
                "sessionToken" : sessionToken,
                "name" : $scope.gc.to,
                "phone" : formattedPhone,
                "amount" : intAmount,
                "iconId" : $scope.occasionId,
                "message" : $scope.gc.occasion,
                "stripeCardToken" : $scope.stripeToken
              }

              var newGiftcard = Giftcards.create(newGiftcardJson, function(){
                  if(newGiftcard.errorid)
                  {
                      $scope.backendError = true;
                      $scope.backendRes = newGiftcard.msg;
                      return;
                  }
                  else {
                      //SUCCESSSSSSSS

                      //fade out to the fancy black page to confirm giftcard


                      //For testing Go to the giftcards page
                      console.log("Success!");
                      $location.path("/giftcards");
                  }
              });
          }
      });
  }

});
