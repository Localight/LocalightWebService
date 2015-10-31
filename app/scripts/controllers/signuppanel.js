'use strict';

/**
 * @ngdoc function
 * @name angularLocalightApp.controller:SignuppanelCtrl
 * @description
 * # SignuppanelCtrl
 * Controller of the angularLocalightApp
 */
angular.module('angularLocalightApp')
  .controller('SignuppanelCtrl', function ($scope, $cookies, $location, $timeout, JoinOwner) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //Boolean for if we receive errors
    $scope.submitError;

    //Return today's date for the date picker
    $scope.getToday = function() {
        return new Date().getDate();
    }

    /**
     * Switch date input type=text to type=date (hack to have a placeholder in a date field)
     */
    $scope.setDate = function() {
        document.getElementById('clique_date_selection').type = 'date';
        //Focus on the date field after setting the type to avoid it blurring
        $timeout(function () {
            document.getElementById('clique_date_selection').disabled = false;
            document.getElementById('clique_date_selection').focus();
        }, 25);
    }

    //Sign up our owner!
    $scope.signUp = function() {

        //First check if their passwords match
        if($scope.password.indexOf($scope.confirmPassword) < 0)
        {
            $scope.submitError = true;
            $scope.theError = "Passwords do not match!";
            return;
        }

        //Create the error object
        $scope.error = {
            isError : true,
            text: ""
        };

        //Regex for all valid emails. To add a TLD, edit the final OR statement.
        var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|co|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
        //Test the form email against the regex
        if (!emailRegex.test($scope.email)) {
            $scope.error.text = "Sorry, thats not a valid email.";
        } else {
            //New owner payload
            var payload = {
               "name" : $scope.username,
               "email" : $scope.email,
               "password" : $scope.password
            }

            //Show(true)/Hide(false) the loading spinner
            $scope.loading = true;

            JoinOwner.submit(payload,
            function(data, status){

                //Success, save the response from the backend
                $scope.owner = data;

                //Save their session token
                $cookies.put("sessionToken", $scope.owner.token);

                //Finally redirect to the main page
                $location.path("/dashboard/main");

                //Show(true)/Hide(false) the loading spinner
                $scope.loading = false;
            },
            function(err)
            {
                if(err.status == 401)
                {
                    $scope.error.text = "Sorry, the entered account information is incorrect.";
                }
                else {
                    $scope.error.text = "Sorry, an error has occured connecting to the database";
                }

                //Show(true)/Hide(false) the loading spinner
                $scope.loading = false;
            });
        }
    }



    /****
    * Credit Card Validation
    ****/

    //Icon URLs for CCs
    //Default, Visa, Mastercard, Amex, Discover
    var cardIcons = [
        "../images/cc-basic-blk.png",
        "../images/cc-visa-blk.png",
        "../images/cc-mastercard-blk.png",
        "../images/cc-amex-blk.png",
        "../images/cc-discover-blk.png"
    ]
    //Set starter icon to be blank
    $scope.cardIcon = cardIcons[0];

    /**
     * Validates form CC. Checks Stripe for validity, determines card type and sets card icon.
     */
    $scope.validateCardNumber = function() {
        //Concatante the credit card number together
        var cardNumber = "";
        for(var i=1; i <= 4; i++){
            cardNumber += document.getElementById("clique_input_creditcardnumber" + i).value;
        }

        //Check if the credit card number is US valid
        if(Stripe.card.validateCardNumber(cardNumber)) {
            $scope.validCC = true;

            //Jump to the date field
            if(cardNumber.length == 13 ||
            cardNumber.length == 15 ||
            cardNumber.length == 16)
            {
                $scope.ccDateSwitch();
            }
        }
        else {
            $scope.validCC = false;
        }

        //Also we should set what card type we have
        var cardType = Stripe.card.cardType(cardNumber);

        var acceptedCards = ["Visa", "MasterCard", "American Express", "Discover"];

        $scope.cardIcon = cardIcons[acceptedCards.indexOf(cardType) + 1];

        //Now see if the card is validated
        $scope.validateCard();
    }

    //Simply focuses on the credit card date fields
    $scope.ccDateSwitch = function () {
        $timeout(function () {
            document.getElementById("clique_input_expiry_m").focus();
        }, 100);
    }

    /**
     * Validates form Date. Checks Stripe for validity.
     */
    $scope.validateDate = function() {
        //Concatante the giftcard number together
        var input1 = document.getElementById("clique_input_expiry_m");
        var input2 = document.getElementById("clique_input_expiry_y");

        $scope.dateValidated = Stripe.card.validateExpiry(input1.value, input2.value);

        //Now see if the card is validated
        $scope.validateCard();
    }

    /**
     * Validates form CVC. Checks Stripe for validity.
     */
    $scope.validateCVC = function() {
        //get the input
        var input1 = document.getElementById("clique_input_cvv");

        $scope.cvcValidated = Stripe.card.validateCVC(input1.value);

        //Now see if the card is validated
        $scope.validateCard();
    }

    /**
     * Validates form zipcode. Checks for length.
     */
    $scope.validateZip = function() {
        //get the input
        var input1 = document.getElementById("clique_input_zip");

        //Simply check if there are 5 digits
        if (input1.value.length > 4) {
            $scope.zipValidated = true;
        } else {
            $scope.zipValidated = false;
        }

        //Now see if the card is validated
        $scope.validateCard();
    }

    /**
     * Checks if all CC fields have been validated independantly
     */
    $scope.validateCard = function() {
        if ($scope.validCC && $scope.dateValidated && $scope.cvcValidated && $scope.zipValidated) {
            $scope.cardValidated = true;

            //Since the card is validated
            //scroll/focus on the next section

        } else {
            $scope.cardValidated = false;
            $scope.cardType = "";
        }
    }

    $scope.trimInput = function(event, length){
        if (event.target.value.length > length) {
            event.target.value = event.target.value.slice(0,length);
            $scope.validateCardNumber();
        }
    }


    /*
    STRIPE
    ------
    ------
    */

    //Setting our stripe key
    Stripe.setPublishableKey('pk_test_XHrjrZeUDNIITwzqrw9OEpQG');

    /**
     * Assembles CC info and creates a token with Stripe
     */
    $scope.tokenizeInfo = function() {

        //Show(true)/Hide(false) the loading spinner
        $scope.loading = true;

        //Disable button while tokenzing the card
        $scope.tokenzing = true;

        //Create finalized card number
        var cardNumber = $scope.cc.number1 + "" + $scope.cc.number2 + "" + $scope.cc.number3 + "" + $scope.cc.number4;

        //Send card info to stripe for tokenization
        Stripe.card.createToken({
            "number": cardNumber,
            "cvc": $scope.cc.cvc,
            "exp_month": $scope.cc.ExpiryM,
            "exp_year": $scope.cc.ExpiryY
        }, function(status, response) {
            if (response.error) {
                //Show(true)/Hide(false) the loading spinner
                $scope.loading = false;

                //Display card error message
                $scope.tokenizeFailure = true;
            } else {
                //Get the token to be submitted later, after the second page
                // response contains id and card, which contains additional card details
                $scope.stripeToken = response.id;

                //Show the next page
                $scope.showPage2 = true;

                //Show(true)/Hide(false) the loading spinner
                $scope.loading = false;

                //timeout and focus on the phone field
                $timeout(function() {
                    //focus on the phone element
                    document.getElementById("clique_input_phonenumber").focus();

                    //Go back to the top
                    $window.scrollTo(0, 0);
                }, 250);
            }

            //Force the change to refresh, we need to do this because I
            //guess response scope is a different scope and has to be
            //forced or interacted with
            $scope.$apply();
        });
    };
  });
