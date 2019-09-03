var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require("../models/users");



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
    User.findone({email:user.email},(err,foundUser) => {
      if(err) return cb(err);
      if(!foundUser) {
        // save 
      }
     cb(null, foundUser);

    })
  
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done)=> {
  User.findById(id, (err, user) => {
    // handle error 
    done(null, user);
  })
})