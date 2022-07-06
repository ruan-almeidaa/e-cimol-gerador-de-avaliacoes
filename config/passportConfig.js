const express = require('express');
const app = express();

var userProfile;
app.use(passport.initialize());
app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
