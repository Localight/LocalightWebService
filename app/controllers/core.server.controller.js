'use strict';

/**
 * Module dependencies.
 */
// var stripe = require('stripe');
// stripe.accounts.create({
// 	country: 'US',
// 	managed: true
// });
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};
