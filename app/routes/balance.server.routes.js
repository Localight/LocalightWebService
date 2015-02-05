'use strict';

module.exports = function(app){
  var balance = require('../../app/controllers/balancedpayments.server.controller');

  // tokenize info link
  app.route('/tokenize').post(balance.tokenizeInfo);
};
