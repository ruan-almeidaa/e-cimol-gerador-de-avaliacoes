const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
require('../functions/auth');

router.get('/logar',
passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get( '/logar/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);
module.exports = router;