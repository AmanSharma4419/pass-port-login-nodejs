var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//handling the route using the passport
router.get("/auth/github" , passport.authenticate("github"));

// router.get("/auth/github" , (req,res) => {
//   console.log("routes")
// })

router.get("auth/github/callback",
  passport.authenticate("github", {faliureRedirect: "/login"}),
  function(req,res) {
    res.redirect("/")
  }
)
module.exports = router;
