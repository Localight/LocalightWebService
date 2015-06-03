'use strict';
// these are like global static variables, that you know won't change throught the program.
module.exports = {
   db: 'mongodb://localhost/clique-dev',
   app: {
      title: 'Clique - Development Environment'
   },
   twilio: {
      accountSID: process.env.ACCOUNT_SID || 'AC3f3d26948bcaffbde196abc45c3e7b89',
      authTOKEN: process.env.AUTH_TOKEN || 'be441e1b8273e1fe4af1ba78169638b0',
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
   // subledger: {
	// 	key: process.env.SUBLEDGER_KEY,
   //    secret: process.env.SUBLEDGER_SECRET,
   //    org_id: process.env.process.env.SUBLEDGER_ORG,
   //    book_id: process.env.process.env.SUBLEDGER_BOOKID,
   //    depositor_category_id: process.env.SUBLEDGER_DEPOSITOR_CATEGORY_ID,
   //    uncleared_category_id:process.env.SUBLEDGER_UNCLEARED_CATEGORY_ID,
   //    balance_sheet_id: process.env.SUBLEDGER_BALANCE_SHEET_ID,
   //    processing_id: process.env.SUBLEDGER_PROCESSING_ID
   // }
};
