'use strict';
var errorHandler = require('./errors.server.controller'),
    config = require('../../config/config'),
    stripe = require('stripe')(config.clientID, config.clientSecret),
    message = null,
    Q = require('q');
