'use strict';

module.exports = {
	db: 'mongodb://localism2:localism@ord-c8-0.objectrocket.com:39020/havenly',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	twilio:{
<<<<<<< HEAD
		acountSID: process.env.ACCOUNT_SID || 'AC9bfd970cef5934b23e69f1ef72812a23',
		authTOKEN: process.env.AUTH_TOKEN || 'a6bfeeed497cfb9b8d10c329ce721759',
=======
		accountSid: process.env.accountSid || 'AC9bfd970cef5934b23e69f1ef72812a23',
		authToken: process.env.authToken || 'a6bfeeed497cfb9b8d10c329ce721759',
>>>>>>> ff452012709ddaf84c886ff810421d40bec0e460
	},
	stripe: {
		clientID: process.env.STRIPE_KEY || 'pk_live_UCGfn9kbM4KSToxEaZPG8RLq',
		clientSecret: process.env.STRIPE_SECRET || 'sk_live_3ScHGwzXRwA5OatDCexMCrnx',
	},
	mailgun: {
		apiKey: process.env.MAILGUN_KEY || 'key-212g0rzf7j9z-n9b7zdl797o3bxrsu38' ,
		domain: process.env.DOMAIN || 'https://api.mailgun.net/v3/rs56424.mailgun.org ',
	},
	mailer: {
		from: process.env.MAILER_FROM || 'postmaster@rs56424.mailgun.org',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'mailgun' ,
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'postmaster@rs56424.mailgun.org',
				pass: process.env.MAILER_PASSWORD || '0z53ixs2b6c4'
			}
		}
	},
        subledger: {
               key: '88OpPqUhvGMhXnkGY6w47K',
               secret: 'zXKdLPenIZ4B2r1cOjl46a',
               org_id: 'O0K0eS2wjuLOSRXpPVGvuV',
               book_id: 'T9UhswcXjeH4Q2nlLu9sYP'
    }
};
