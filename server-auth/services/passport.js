const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

/**************************************/
//  handle Signin using LocalStrategy
/**************************************/
const localOptions = {
  // by default looks for usernameField ~ username
  usernameField:'email'
};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({email: email}, function (err, user) {
    if(err){
      return done(err, false);
    }
    if(!user){
      return done(null, false);
    }
    // if user found, compare entered bcrypted password with db password
    user.comparePassword(password, function (err, isMatch) {
      if(err){
        return done(err, false);
      }
      if(!isMatch){
        return done(null, false);
      }
      else {
        // if user email found in db and passwords auth'd
        // return user ~ to be used in auth.signin controller
        return done(null, user);
      }
    });
  });
});

/**************************************/
//  handle Signup using JwtStrategy
/**************************************/
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // payload is the return value from tokenForUser
  // payload.sub ~ user id
  User.findById(payload.sub, function (err, user) {
    if(err){
      return done(err, false);
    }
    if(user){
      // if exists, return user ~ auth'd
      return done(null, user);
    }
    else {
      return done(null, false);
    }
  });
});

// tell passport to use Strategy
passport.use(localLogin);
passport.use(jwtLogin);
