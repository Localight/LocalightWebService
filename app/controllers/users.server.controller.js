'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./api/users/api/users.authentication.server.controller'),
	require('./api/users/api/users.authorization.server.controller'),
	require('./api/users/api/users.password.server.controller'),
	require('./api/users/api/users.profile.server.controller'),
	require('./api/users/stripe/stripe.charges.server.controller')
);
