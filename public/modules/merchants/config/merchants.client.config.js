'use strict';

// Configuring the Articles module
angular.module('merchants').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Merchants', 'merchants', 'dropdown', '/merchants(/create)?');
		Menus.addSubMenuItem('topbar', 'merchants', 'List Merchants', 'merchants');
		Menus.addSubMenuItem('topbar', 'merchants', 'New Merchant', 'merchants/create');
	}
]);