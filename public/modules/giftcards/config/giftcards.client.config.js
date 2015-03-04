'use strict';

// Configuring the Articles module
angular.module('giftcards').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Giftcards', 'giftcards', 'dropdown', '/giftcards(/create)?');
		Menus.addSubMenuItem('topbar', 'giftcards', 'List Giftcards', 'giftcards');
		Menus.addSubMenuItem('topbar', 'giftcards', 'New Giftcard', 'giftcards/create');
	}
]);