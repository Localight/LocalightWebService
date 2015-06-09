'use strict';

/**
 * Module dependencies
 */

module.exports = function(app){
   var twilioController = require('../../app/controllers/twilio.server.controller');

   app.route('/sms/pingFromTwilio').get(twilioController.interceptTwilioMesage);
};
