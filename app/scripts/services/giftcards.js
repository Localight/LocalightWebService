'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.giftcards
 * @description
 * # giftcards
 * Service in the angularLocalightApp.
 */

 //Use http://localhost:3000/ for testing with nodemon
angular.module('angularLocalightApp')
  .service('Giftcards', function ($resource) {

      return $resource( 'http://localhost:3000/giftcards',
          { }, {
              create: {
                  method: 'POST',
                  params: {},
                  isArray: false
              },
              get: {
                  method: 'GET',
                  params: {},
                  isArray: true
              }
          } );
  });

  angular.module('angularLocalightApp')
  .factory('GiftcardById', ['$resource', function($resource) {

  return $resource( 'http://localhost:3000/giftcards/:id',
      { }, {
          get: {
              method: 'GET',
              params: {},
              isArray: false
          }

      } );
  }]);
