var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

//passport.serializeUser

//passport.serializeUser

passport.use(new GitHubStrategy({
    clientID: process.env.ClientID,
    clientSecret: process.env.ClientSecret,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   console.log(profile)
    //   return cb(err, user);
    // });
    return cb(null, true);
  }
));