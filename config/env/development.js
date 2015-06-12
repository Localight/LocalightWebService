'use strict';
// these are like global static variables, that you know won't change throught the program.
module.exports = {
   db: 'mongodb://localhost/clique-dev',
   app: {
      title: 'Clique - Development Environment'
   },
   twilio: {
      accountSID: process.env.ACCOUNT_SID || 'AC9bfd970cef5934b23e69f1ef72812a23',
      authTOKEN: process.env.AUTH_TOKEN || 'a6bfeeed497cfb9b8d10c329ce721759',
   },
   mailgun: {
      apiKey: 'key-212g0rzf7j9z-n9b7zdl797o3bxrsu38',
      domain: 'https:/.mailgun.net/v3/rs56424.mailgun.org',
   },
   mailer: {
      from: process.env.MAILER_FROM || 'postmaster@rs56424.mailgun.org',
      options: {
         service: process.env.MAILER_SERVICE_PROVIDER || 'mailgun',
         auth: {
            user: process.env.MAILER_EMAIL_ID || 'postmaster@rs56424.mailgun.org',
            pass: process.env.MAILER_PASSWORD || '0z53ixs2b6c4'
         }
      }
   },
   stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_GvAql6HE34rlYwDR3FLSjaHt',
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_WHOQeKIKG2CfUsaGl5cAU2Dl',
   },
};
