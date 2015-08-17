'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.giftcards
 * @description
 * # giftcards
 * Service in the angularLocalightApp.
 */

angular.module('angularLocalightApp')
  .service('Giftcards', function ($resource) {

      return $resource( window.location.protocol + "//" + window.location.hostname + ':3000/giftcards',
          { }, {
              create: {
                  method: 'POST',
                  params: {},
                  isArray: false
              },
              get: {
                  method: 'GET',
                  params: {}
              }
          } );
  });

  angular.module('angularLocalightApp')
  .factory('GiftcardById', ['$resource', function($resource) {

  return $resource( window.location.protocol + "//" + window.location.hostname + ':3000/giftcards/:id',
      { }, {
          get: {
              method: 'GET',
              params: {},
              isArray: false
          }

      } );
  }]);
