'use strict';
/**
 * Module dependencies
 */
var should = require('should'),
   mailgunService = require('../services/mailgun-service');

/**
 * The objective of this test class is to test whether or not
 * an email get's sent to and know what todo when the email doesn't
 * get sent. This class will be used in other classes as a service.
 */

describe('Mailgun Service Unit Test: ', function() {
   // What am I testing?, You are testing whether the giftcard shoots off or not.
   describe('Method Send Reciept Email', function() {

      it('Should send an Email to the email provided without problems', function() {

         return mailgunService.sendEmailReceipt('ypearnrc@grandmamail.com', function(err) {
            should.expect('250 Great success');
         });
      });// End "it" block

   });// End Method Send Email Recipet

});//End Main Describe Block
