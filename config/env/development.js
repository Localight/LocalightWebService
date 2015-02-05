'use strict';
var balanced = require('balanced-offical');

module.exports = {
	db: 'mongodb://localhost/clique-dev',
	app: {
		title: 'Clique - Development Environment'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	},
	twilio: {
			acctSid: 'AC9bfd970cef5934b23e69f1ef72812a23',
			authToken: 'a6bfeeed497cfb9b8d10c329ce721759',
			disableSigCheck: false,
	},
	mailgun: {
					apiKey: 'key-212g0rzf7j9z-n9b7zdl797o3bxrsu38',
					domain: 'https://api.mailgun.net/v2/rs56424.mailgun.org/messages',
					from: 'auction@TeachArt.org'
	},
	balanced:'TEST-MP64VYOM3SE79TEgc4WIlgXu',
	subledger: {
			key: '88OpPqUhvGMhXnkGY6w47K',
			secret: 'zXKdLPenIZ4B2r1cOjl46a',
			org_id: 'O0K0eS2wjuLOSRXpPVGvuV',
			book_id: 'T9UhswcXjeH4Q2nlLu9sYP',
			depositor_category_id: '1z4e9kQSwcJ7tUNnnsMjnH',
			uncleared_category_id: 'eml3U9NiHaauqimfRwCQLz',
			balance_sheet_id: 'w0du5EvqLHUCDusk6imDEl',
			processing_id: 'niybAvJdacBXxQktA3F12m'
	}
};
