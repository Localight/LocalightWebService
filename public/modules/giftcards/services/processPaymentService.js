'use strict';
// this will handle sequence that leads up to a giftcard being purchased
// Payment Service for managing calls to backend API
angular.module('giftcards')
  .service('processPaymentService', function($q, $http) {
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
            $http.post('/auth/findOrCreateUser', {
              firstName: firstName,
              username: mobileNumber
            }));
          return dfd.promise;
          // need to turn this into a promise
        }
        // take in the mobile number and just send it to the backend and expect back a user id.
    };
  });
