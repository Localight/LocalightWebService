'use strict';

//Merchants service used to communicate Merchants REST endpoints
angular.module('merchants').factory('Merchants', ['$resource',
	function($resource) {
		return $resource('merchants/:merchantId', { merchantId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
