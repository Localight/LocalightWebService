'use strict';

/**
 * Module dependencies.
 */
// var stripe = require('stripe');
// stripe.accounts.create({
// 	country: 'US',
// 	managed: true
// });
// this gets called everytime someone requests the website i think.
exports.index = function(req, res) {
	res.render( 'index',
	{
		user: req.user || null,
		request: req
	}  );
};
