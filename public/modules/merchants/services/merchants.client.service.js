'use strict';
//TODO: come back and understand this part in more depth. what tool did they give me?
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
