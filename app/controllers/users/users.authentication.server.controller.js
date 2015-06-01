'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  errorHandler = require('../errors.server.controller'),
  mongoose = require('mongoose'),
  // twilio = require('twilio'),
  passport = require('passport'),
  Q = require('q'),
  User = mongoose.model('User'),
  config = require('../../../config/config'),
  message = null,
  stripe = require('stripe')(config.clientID, config.clientSecret);

exports.signup = function(req, res) {

  delete req.body.roles;

  // Init Variables
  var user = new User(req.body);
  var message = null;

  // Add missing user fields
  user.provider = 'local';
  user.fullName = user.firstName + ' ' + user.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;

  stripe.customers.create({
    description: 'This is a customer who can purchase giftcards for localism.',
    email: user.email,
     metadata: {
       userId: user._id,
       firstName: user.firstName,
       lastName: user.lastName,
       phoneNumber:user.username
     }
  }).then(function handler(response) {
    user.stripeCustomerToken = response.id;// store the stripe token.
    return user.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        // Remove sensitive data before login
        user.password = undefined;
        user.salt = undefined;
        req.login(user, function(err) {
          if (err) {
             console.log(err);
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
      }
    });
  }).catch(function errHandler(err) {
     console.log(err);
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
exports.giftWebHook = function(req, res){
  this.findOrCreateUser(req.body.From.slice(2, 12));
  // get the user id of the mobile number from the user.
  // send teh user back a astatic create giftcard site.
  // if the user is new the info is blank, if returning, info filled in.
  // no need to log the user in for buying a giftcard. make sure can't add own user name to giftcard too.
  // at some point make sure the url and or cookie seld denotates, so user's data is protected.
  // remember to just return a static page.
};
/**
 * Find or create user based on mobile number
 */
exports.findOrCreateUser = function(req, res) {
  // this is a controller, but you do everything in a controller.
  // getting user from database.
  // doing to much in controller.
  // user.service, pass in phone number. return the object as promise or callback.
  User.findOne({
    'mobileNumber': req.body.username
  }, function(err, user) {
    // In case of any error return
    if (err) {
      return (err);
    }
    // already exists
    if (user) {
      return res.json(user);
    } else {
      // if user is not found create here.
      // if there is no user with that phoneNumber
      // create the user, with the data entered on the giftcard
      var anotherUser = new User(req.body);
      // set the user's local credentials
      anotherUser.firstName = req.body.firstName;
      // anotherUser.password = createHash(password);//TODO: come back to this.
      anotherUser.password = 'password'; //TODO: figure out how to handle new user signup later.
      anotherUser.mobileNumber = req.body.mobileNumber;
      anotherUser.provider = 'local';
    //  anotherUser.email = req.body.email;

      var payload = {
        description: req.fullName
      };
      // passport
      //
      stripe.customers.create(payload).then(function handler(response) {
        // get and save the new users's token.
        anotherUser.stripeCustomerTokenThing = response.id;
        return anotherUser.save(); // saves user here.
      }).then(function anotherHandler(response){
        return res.json(anotherUser);
      }).catch(function errHandler(err) {
        return res.status(400).send(err);
      });
      // tokenize user as well.
      //TODO: need to figure out how and when to do that for user.
      // in theory could add it to the sign in, then if they have a token already it doesn't fire.
      // anotherUser.email = req.param('email');
      // newUser.firstName = req.param('firstName');
      // newUser.lastName = req.param('lastName');
      // save the user
    }
  });
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user, redirectURL) {
      if (err || !user) {
        return res.redirect('/#!/signin');
      }
      req.login(user, function(err) {
        if (err) {
          return res.redirect('/#!/signin');
        }

        return res.redirect(redirectURL || '/');
      });
    })(req, res, next);
  };
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function(req, providerUserProfile, done) {
  if (!req.user) {
    // Define a search query fields
    var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
    var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

    // Define main provider search query
    var mainProviderSearchQuery = {};
    mainProviderSearchQuery.provider = providerUserProfile.provider;
    mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

    // Define additional provider search query
    var additionalProviderSearchQuery = {};
    additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

    // Define a search query to find existing user with current provider profile
    var searchQuery = {
      $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
    };

    User.findOne(searchQuery, function(err, user) {
      if (err) {
        return done(err);
      } else {
        if (!user) {
          var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

          // we're not going to use this method
          User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
            user = new User({
              firstName: providerUserProfile.firstName,
              lastName: providerUserProfile.lastName,
              username: availableUsername,
              displayName: providerUserProfile.displayName,
              email: providerUserProfile.email,
              mobileNumber: providerUserProfile.
              mobileNumber,
              provider: providerUserProfile.provider,
              providerData: providerUserProfile.providerData
            });

            // And save the user
            user.save(function(err) {
              return done(err, user);
            });
          });
        } else {
          return done(err, user);
        }
      }
    });
  } else {
    // User is already logged in, join the provider data to the existing user
    var user = req.user;

    // Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
    if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
      // Add the provider data to the additional provider data field
      if (!user.additionalProvidersData) user.additionalProvidersData = {};
      user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

      // Then tell mongoose that we've updated the additionalProvidersData field
      user.markModified('additionalProvidersData');

      // And save the user
      user.save(function(err) {
        return done(err, user, '/#!/settings/accounts');
      });
    } else {
      return done(new Error('User is already connected using this provider'), user);
    }
  }
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function(req, res, next) {
  var user = req.user;
  var provider = req.param('provider');

  if (user && provider) {
    // Delete the additional provider
    if (user.additionalProvidersData[provider]) {
      delete user.additionalProvidersData[provider];

      // Then tell mongoose that we've updated the additionalProvidersData field
      user.markModified('additionalProvidersData');
    }

    user.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.login(user, function(err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(user);
          }
        });
      }
    });
  }
};
