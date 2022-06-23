const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '424783679661-5vhakmt35b635enef94ae0n6eo70tahr.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/logar/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports='auth';