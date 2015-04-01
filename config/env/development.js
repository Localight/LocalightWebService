'use strict';

module.exports = {
	db: 'mongodb://localhost/clique-dev',
	app: {
		title: 'Clique - Development Environment'
	},
	mailgun: {
					apiKey: 'key-8972c0fdf717238d1f3cf94cb8e48b80',
					 domain: 'https://api.mailgun.net/v3/sandbox428c48a0bb81470fa274a3dd60e05d8d.mailgun.org',
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
