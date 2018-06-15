const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  profile_image: {
    type: String
  },
  thumbnail_image: {
    type: String
  },
  date: {
    type: String,
    default: Date.now
  },
  active: { type: Boolean, required: true, default: false }
});

module.exports = User = mongoose.model("users", UserSchema);
