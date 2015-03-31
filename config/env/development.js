'use strict';

module.exports = {
	db: 'mongodb://localhost/clique-dev',
	app: {
		title: 'Clique - Development Environment'
	},
	mailgun: {
					apiKey: 'key-212g0rzf7j9z-n9b7zdl797o3bxrsu38',
					 domain: 'https://api.mailgun.net/v2/rs56424.mailgun.org/messages',
					 from: 'auction@TeachArt.org'
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
	stripe: {
		clientID: process.env.STRIPE_KEY || 'pk_test_K9boQ4rhnqnHLA9hd5ZKPg64',
		clientSecret: process.env.STRIPE_KEY || 'sk_test_aczvTWoQ4G9GG9XNrHLvMEIj',
	},

};
