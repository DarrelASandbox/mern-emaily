const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./services/passport');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cookieSession({
    keys: [process.env.COOKIE_KEY],
    maxAge: 6 * 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.listen(port, () => console.log(`Emaily app listening on port ${port}`));
