const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatchSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  place: {
    type: String
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  thumbnail_image: {
    type: String
  },
  results: {
    type: String
  },
  players: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      thumbnail_image: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Match = mongoose.model("match", MatchSchema);
