// import all the things we need  
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/logar/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
        }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}