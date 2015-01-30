'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		// if i take these away will that load the main page. with out the user
		user: req.user || null,// take the request and 
		request: req
	});
};
