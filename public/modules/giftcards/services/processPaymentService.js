'use strict';
// this will handle sequence that leads up to a giftcard being purchased
// Payment Service for managing calls to backend API
angular.module('giftcards')
  .service('processPaymentService', function($q, $http) {
    return {
      // should return a token
      tokenizeCard : function(customerTokenThing, name, number, exp_month, exp_year, cvv, name)
      {
        var error;

        if(!Stripe.card.validateCardNumber(number)){
          error = buildError('number', 'Your card number is incorrect.');
        }
        else if(!Stripe.card.validateExpiry(exp_month, '20'+ exp_year)){
          error = buildError('expiry', 'Your expiration date is incorrect.');
        }
        else if(!Stripe.card.validateCVV(cvv)){
          error = buildError('cvv', 'Your cvv is incorrect');
        }
        if(error){
          error_callback(error);
          return;
        }

        // callback = function(status, response) {
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
        Stripe.card.createToken({
          name: name,
          number: number,
          exp_month: exp_month,
          exp_year: exp_year,
          cvv: cvv
        }, callback);
      },
      // this probably should be another service but, i'm not sure.
      // if you are looking at this in the future sorry, i'm just learning how to this. @JamesHall03/24/2014
      findOrCreateUser : function(giftcard)
      {
        // need to turn this into a promise
        $http.post('/auth/findOrCreateUser/', giftcard).success(function(data){
          return data;// this should be the id of the user you are sending the giftcard too.
        }).error(function(){
          // need to research how to use errors, better
          throw new Error('Cannont connect to server');
          //handle the error.
        });
        // take in the mobile number and just send it to the backend and expect back a user id.
      },
      chargeCard : function(){
      },
    };

  });
