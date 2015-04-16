'use strict';
// Giftcards controller
angular.module('giftcards')
  .controller('GiftcardsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Giftcards', 'processPaymentService', '$log', '$q',
    function($scope, $http, $stateParams, $location, Authentication, Giftcards, processPaymentService, $log, $q) {
      $scope.authentication = Authentication;
      $scope.gc = new Giftcards();

      $scope.prices = [5, 10, 25, 50, 75, 100];
      $scope.setAmount = function(anAmount) {
        console.log('amount selected: ' + anAmount);
        $scope.gc.amount = anAmount;
        console.log('amount in scope: ' + $scope.gc.amount);
      };
      $scope.isAmount = function(checkAmount) {
        return $scope.gc.amount === checkAmount; // boolean
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
                giftcard.toUser = response.data._id;
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
          giftRecipientFirstName: 'my friends name',
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
