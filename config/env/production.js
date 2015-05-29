'use strict';

module.exports = {
   db: process.env.MONGO_URL,
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
   twilio: {
      acountSID: process.env.TWILIO_KEY,
      authTOKEN: process.env.TWILIO_AUTH_TOKEN,
   },
   stripe: {
      clientID: process.env.STRIPE_KEY,
      clientSecret: process.env.STRIPE_SECRET,
   },
   mailgun: {
      apiKey: process.env.MAILGUN_KEY,
      domain: process.env.DOMAIN,
   },
   mailer: {
      from: process.env.MAILER_FROM,
      options: {
         service: process.env.MAILER_SERVICE_PROVIDER,
         auth: {
            user: process.env.MAILER_EMAIL_ID,
            pass: process.env.MAILER_PASSWORD
         }
      }
   },
};
