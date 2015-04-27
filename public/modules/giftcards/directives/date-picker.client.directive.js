'use strict';

angular.module('giftcards').directive('datePicker', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Date picker directive logic
				// ...

				element.text('this is the datePicker directive');
			}
		};
	}
]);