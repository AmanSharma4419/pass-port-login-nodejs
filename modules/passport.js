var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require("../models/users")
passport.serializeUser((user,done) => {
  done(null,user.username)
})

passport.use(new GitHubStrategy({
    clientID: process.env.ClientID,
    clientSecret: process.env.ClientSecret,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    //console.log(profile);
    var user = {
      name: profile.name,
      email:profile.email
    };
    user.findone({email:user.email},(err,findedUser) => {
      if(err)
    })
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null, user);
  }
));