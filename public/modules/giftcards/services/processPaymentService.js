'use strict';
// this will handle sequence that leads up to a giftcard being purchased
// Payment Service for managing calls to backend API
angular.module('giftcards').service('processPaymentService', function($q){
  return {
    getTokenizeCard : function()
    {
      var dfd = $q.defer();
      // make call to backend to get tokenized card.
      dfd.resolve({

      });
      return dfd.promise;
    }
  };
});
