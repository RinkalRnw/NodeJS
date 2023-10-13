const passport = require('passport')
const mongoose = require('mongoose');

const model = require("./mongoosedb")
var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user , done) => { 
  done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
  done(null, user); 
}); 
passport.use(new GoogleStrategy({
    clientID:"127792281349-6nn6l12m7tdbsv4a1no7bmgsrsv3jvmf.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    model.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


