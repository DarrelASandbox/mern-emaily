const express = require('express');
const { access } = require('fs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },

    function (accessToken, refreshToken, profile, done) {
      console.log({ accessToken });
      console.log({ refreshToken });
      console.log({ profile });
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.listen(port, () => console.log(`Emaily app listening on port ${port}`));
