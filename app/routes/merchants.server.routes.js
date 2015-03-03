'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var merchants = require('../../app/controllers/merchants.server.controller');

	// Merchants Routes
	app.route('/merchants')
		.get(merchants.list)
		.post(users.requiresLogin, merchants.createCustomer)
		.post(users.requiresLogin, merchants.createBankAccount);

	app.route('/merchants/:merchantId')
		.get(merchants.read)
		.put(users.requiresLogin, merchants.hasAuthorization, merchants.update)
		.delete(users.requiresLogin, merchants.hasAuthorization, merchants.delete);

	// Finish by binding the Merchant middleware
	app.param('merchantId', merchants.merchantByID);
};
