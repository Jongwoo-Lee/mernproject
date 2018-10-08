const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true
  },
  height: {
    type: String
  },
  weight: {
    type: String
  },
  mainfoot: {
    type: [{ value: String, num: Number }],
    required: true
  },
  mainposition: {
    type: [{ value: String, num: Number }],
    required: true
  },
  bio: {
    type: String
  },
  birthday: {
    type: String
  },
  match: [
    {
      type: Schema.Types.ObjectId,
      ref: "match"
    }
  ],
  goal: [
    {
      match: {
        type: Schema.Types.ObjectId,
        ref: "match"
      },
      amount: {
        type: Number
      }
    }
  ],
  assist: [
    {
      match: {
        type: Schema.Types.ObjectId,
        ref: "match"
      },
      amount: {
        type: Number
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
