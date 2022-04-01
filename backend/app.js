const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./services/passport');

mongoose.connect(process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 4000;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({
    keys: [process.env.COOKIE_KEY],
    maxAge: 6 * 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (_, res) =>
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  );
}

app.listen(port, () => console.log(`Emaily app listening on port ${port}`));
