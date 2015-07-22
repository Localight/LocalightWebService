'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.giftcards
 * @description
 * # giftcards
 * Service in the angularLocalightApp.
 */
angular.module('angularLocalightApp')
  .service('giftcards', function () {

      return $resource( '/giftcards',
          { }, {
              create: {
                  method: 'POST',
                  params: {},
                  isArray: false
              }
          } );
  });
