var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//handling the route using the passport
router.get("/auth/github" , passport.authenticate("github"));

//handling the route from startegy
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
module.exports = router;
