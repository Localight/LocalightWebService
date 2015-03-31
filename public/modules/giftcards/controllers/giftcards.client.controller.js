'use strict';
// Giftcards controller
angular.module('giftcards')
  .controller('GiftcardsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Giftcards', 'processPaymentService', '$log', '$q',
    function($scope, $http, $stateParams, $location, Authentication, Giftcards, processPaymentService, $log, $q) {
      $scope.authentication = Authentication;

      $scope.create = function() {

          // var payload = {
          //   customer: $scope.authentication.user.stripeCustomerToken,
          //   number:$scope.cc.number,
          //   exp_month: $scope.cc.exp_month,
          //   exp_year: $scope.cc.exp_year,
          //   cvc: $scope.cc.cvc
          // };
          // var aPhoneNumber = 1234567890,
          //   displayName = 'test user';
        var giftcard = new Giftcards({
          giftRecipientName: 'john smith',
          amount: 12345,
          mobileNumberOfRecipient: 1234567890,
          //ourName:'theUsersname here',
          message: 'A gift for you!',
          toUser: null
            //toUserUserName:'username',
            //	districtNumber: 'number',
        });
        var payload = {
        // source: $scope.authentication.user.stripeCustomerToken,
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
        };
        // check if this customer already has a card token or not. if they do use that one, if they don't,
        // send this card and have it create a new token. but also re-assoicate this card with this user.
        // then proceed to create the giftcard.
        //
        // get the parameters from scope.
        //
        // if($scope.authentication.useir.stripeCardId === null ){
        //
        // }else if ($scope.authentication.user.stripeCardId){
        //
        // } else{
        //   // throw you did not enter in a card t
        // }
        //
        processPaymentService.tokenizeCard(payload).then(function handler(response) {
          $scope.authentication.user.stripeCardToken = response.id;
          return processPaymentService.findOrCreateUser(giftcard.mobileNumberOfRecipient, giftcard.giftRecipientName);
        }).then(function anotherHandler(response) {
          giftcard.toUser = response.data._id;
          return giftcard.$save();
        }).then(function yetAnotherHanlder(response) {
          return $location.path('/giftcards');
        }).catch(function errHandler(errorResponse) {
          $scope.error = errorResponse.error.message;
        });
        // var giftcard = new Giftcards({
        //     giftRecipientName: 'asdfas',
        //     amount: 344444444,
        //     mobileNumberOfRecipient: 5132403435,
        //     //ourName:'theUsersname here',
        //     message: 'A gift for you!',
        //     //toUser: data._id
        //     //purchaseOrder:response
        //     //toUserUserName:'username',
        //     //	districtNumber: 'number',
        //   });
        //
        //  var getUserId = function( giftcard ) {
        //     return processPaymentService.findOrCreateUser(giftcard.mobileNumberOfRecipient, giftcard.giftRecipientName); // request #1
        //   },
        //   saveId = function( data ) {
        //     console.log('contents of the response from the server '+data);
        //     var holder = JSON.parse(data);
        //     giftcard.toUser = holder;
        //     return processPaymentService.sendGiftCard(giftcard);
        //   },
        //   // lastThing = function(giftcard) {
        //   //
        //   // },
        //   reportProblems = function(fault) {
        //     $log.error(String(fault));
        //   };

        // getUserId(giftcard).then(saveId).catch(reportProblems);
        //$location.path('/giftcards');


        // .then(function anotherHandler(response) {
        //    giftcard.toUser = response;
        //    return giftcard.$save();
        //  }).then(function (response){
        //    $location.path('/giftcards');
        //  }).catch(function errorHandler(errorResponse){
        //    $scope.error = errorResponse.data.message;
        //  });
        // Stripe.card.createToken(payload,)
        //   .then(function handler(response) {
        //     $scope.authentication.user.cardTokenThing = response.id;
        //   }).then()


        // data filled from the forms

        //TODO: figure out how to make sure we only accept debit cards.
        // next you need to create the giftcard.
        // before you can create the giftcard you need to find the other user.


        // now to create the water fall.
        // first gather credit card info, we want to get rid of senstive data as soon as possible.
        // 1. get tokenized credit card.
        // 2. store token in scope for now.
        // 3. charge card, get user customer token, and send that back.
        // 4. find the user if the user doesn't exist create them.
        // 5. get the new user id.
        // 6. create the giftcard.
        // 7. send recipent email, and text new user.
        // $http.post('/tokenizeCard', ).then(function handler(response){// grab the token
        // 	var holder = response;
        // 	return $http.post('/chargeCard', holder);// could add a step to create an order if we wanted too. charge the card and create an order
        // }).then(function anotherHandler(response){
        // 	// give the giftcard the order number or debit token
        // 	var giftcard = new Giftcards ({
        // 		giftRecipientName:this.giftRecipientName,
        // 		amount:this.amount,
        // 		mobileNumberOfRecipient:this.mobileNumberOfRecipient,
        // 		//ourName:'theUsersname here',
        // 		message:'A gift for you!',
        // 		purchaseOrder:response
        // 		//toUserUserName:'username',
        // 		//	districtNumber: 'number',
        // 	});
        // 	return giftcard.$save();
        // }).then(function yetAnotherHandler(response) {
        // 	// not sure what you get back at this point.
        // 		// Clear form fields
        // 		$scope.amount = '';
        // 		$scope.toUserUserName = '';
        // 		$scope.districtNumber = '';
        // 		$scope.mobileNumberOfRecipient = '';
        // 		// reset all fields
        // 		$scope.payingCardToken = '';
        // 		$location.path('/');
        // 	}).catch(function(errorResponse){
        // 		$scope.error = errorResponse.data.message;
        // 	});


        // 1. Create Order
        // 2. Tokenize Card
        // 3. Charge Card
        // 4. Save Gitcard
        // Create new Giftcard object

        // I could just make a credit card model.
        // var payload = {
        // 	expiration_month:'12',
        // 	expiration_year:'2020',
        // 	number:'341111111111111',
        // 	cvc:'1234',
        // 	name:'Test User'
        // 	// check balanced for what they need.
        // 	// either way we need the credit card info for part of this.
        // };
        // The payment sequence.
        // 1. Tokenize credit card, if we haven't already

        // step 1. Charge Card,
        // step 2. Create giftcard,

        // tokenize credit card.

        // otherwise.
        // create order and charge card
        // email customer recipet,
        // save giftcard.
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
          giftRecipientName: 'my friends name',
          amount: 1000,
          mobileNumberOfRecipient: 1234567890,
          merchant: 'aMerchantId here',
          toUserUserName: 'username',
          message: 'A gift for you!',
          districtNumber: 'number',
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


      // Find a list of Giftcards
      $scope.find = function() {
        $scope.giftcards = Giftcards.query();
      };

      // Find existing Giftcard
      $scope.findOne = function() {
        $scope.giftcard = Giftcards.get({
          giftcardId: $stateParams.giftcardId
        });
      };
    }
  ]);
