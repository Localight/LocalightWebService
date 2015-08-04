'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.locations
 * @description
 * # locations
 * Service in the angularLocalightApp.
 */
 angular.module('angularLocalightApp')
   .service('Locations', function ($resource) {

       return $resource( window.location.protocol + "//" + window.location.hostname + ':3000/locations',
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
