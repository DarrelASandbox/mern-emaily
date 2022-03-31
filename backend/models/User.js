const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, require: true },
});

module.exports = mongoose.model('User', userSchema);
