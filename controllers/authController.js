const express = require('express');
const app = express();
require('dotenv/config');
const router = express.Router();
const passport = require("passport");

const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/logar/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
router.get('/logar', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/logar/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

  router.get('/success', (req, res) => res.render("menu"));  
  router.get('/error', (req, res) => res.render("index"));

module.exports = router;
