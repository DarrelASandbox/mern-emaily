const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

// export directly instead of creating a model
module.exports = recipientSchema;
