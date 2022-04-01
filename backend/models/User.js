const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, require: true },
  credits: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
