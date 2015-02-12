'use strict';

module.exports = function(app) {
//	var users = require('../../app/controllers/users.server.controller');
	var merchants = require('../../app/controllers/merchants.server.controller');

	// Merchants Routes
	app.route('/merchants')
		.get(merchants.list)
		.post(merchants.signupMerchant);

	app.route('/merchants/:merchantId')
		.get(merchants.read)
		.put(merchants.update)
		.delete(merchants.delete);

	// Finish by binding the Merchant middleware
	app.param('merchantId', merchants.merchantByID);
};
