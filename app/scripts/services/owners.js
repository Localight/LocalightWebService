'use strict';

/**
 * @ngdoc service
 * @name angularLocalightApp.Owners
 * @description
 * # Owners
 * Service in the angularLocalightApp.
 */
 angular.module('angularLocalightApp')
 .factory('Owners', ['$resource', function($resource) {

 return $resource( window.location.protocol + "//" + window.location.hostname + ':3000/owners',
     { }, {
         get: {
             method: 'GET',
             params: {},
             isArray: false
         }

     } );
 }]);

 angular.module('angularLocalightApp')
 .factory('JoinOwner', ['$resource', function($resource) {

 return $resource( window.location.protocol + "//" + window.location.hostname + ':3000/owners/join',
     { }, {
         submit: {
             method: 'POST',
             params: {},
             isArray: false
         }

     } );
 }]);

 angular.module('angularLocalightApp')
 .factory('LoginOwner', ['$resource', function($resource) {

 return $resource( window.location.protocol + "//" + window.location.hostname + ':3000/owners/login',
     { }, {
         submit: {
             method: 'POST',
             params: {},
             isArray: false
         }

     } );
 }]);
