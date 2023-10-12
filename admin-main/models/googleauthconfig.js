var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID:"127792281349-6nn6l12m7tdbsv4a1no7bmgsrsv3jvmf.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));