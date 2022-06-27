const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get('/logar', passport.authenticate('google', { scope: ['profile','email'] }));

router.get(
    '/logar/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.send("logou com sucesso!");
    }
);

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
});
module.exports = router;