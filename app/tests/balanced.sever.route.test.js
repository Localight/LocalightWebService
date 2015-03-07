// 'use strict';
// var should = require('should'),
// 	request = require('supertest'),
// 	app = require('../../server'),
// 	mongoose = require('mongoose'),
// 	Balance = ('./controllers/balanced.server.controller'),
// 	agent = request.agent(app);
//
// /**
//  * Globals
//  */
// var passingCheckingBankAccount, passingSavingBankAccount, customer, balance;
//
// /**
//  * Balanced routes tests
//  * This is how I will know if the controller I created works or not.
//  */
// describe('Balancedjs CRUD tests', function(){
// 	beforeEach(function(done){
//
//
// 		// maybe later add a failing and pending checkings accounts
// 			passingCheckingBankAccount = {
// 				account_number:'9900000002',
// 				routing_number:'021000021',
// 				account_type:'checking',
// 			};
// 			// maybe later add a failing and pending savings accounts.
// 			passingSavingBankAccount = {
// 				account_number:'9900000003',
// 				routing_number:'321174851',
// 				account_type:'savings',
// 			};
//
// 		// create some dumby data
// 		// first a customer
// 		 customer = {
// 			ein: '123456789',
// 			email:'franktest@test.com',
// 			name: 'test first and last',
// 			business_name: 'test busines name',
// 			phone: '123456789',
// 			businesAddress: {
// 				line1: '123 ocean place',
// 				line2: 'no one ever has this',
// 				city: 'long beach',
// 				state:'CA',
// 				postal_code:'90802',
// 			},
// 		};
// 			// might need to make these users or merchants,
// 			done();
// 	});
// });
//
// it('should be able to tokenize a customers data, and get back a customer token from the balanced api', function(done){
// 	agent.post('/balanced/tokenizeCustomer')
// 	.send(customer)
// 	.expect(200)
// 	.end(function(balancedErr, tokenRes){
// 		// Handle balanced api call error
// 		if( balancedErr) done(balancedErr);
//
// 		// get the userId
// 	// 	var customerCopy = {
// 	// 		ein: customer.ein,
// 	// 		email:customer.email,
// 	// 		name: customer.name,
// 	// 		business_name: customer.business_name,
// 	// 		phone: customer.phone,
// 	// 		businesdAddress: {
// 	// 			line1: customer.businesdAddress.line1,
// 	// 			line2: customer.businesdAddress.line2,
// 	// 			city: customer.businessAddress.city,
// 	// 			state: customer.businessAddress.state,
// 	// 			postal_code:customer.businessAddress.postal_code,
// 	// 	}
// 	// };
// 		agent.post('/tokenizeCustomer')
// 		.send(customer)
// 		.expect(200)
// 		.end(function(customerTokenizeErr, customerTokenizeRes){
// 			//Handle Merchant save error
// 			if (customerTokenizeErr)done(customerTokenizeErr);
//
// 			var somethingBack = {
// 				firstName: customerTokenizeRes.body.firstName,
// 				customerToken: customerTokenizeRes.body.href
// 			};
// 			(somethingBack[0].firstName).should.equal('NULL');
// 			console.log(somethingBack);
// 			// Call teh assertion callback
// 			done();
// 		});
// 	});
// });
