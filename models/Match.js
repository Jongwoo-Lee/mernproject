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
    type: Date
  },
  end: {
    type: Date
  },
  type: {
    type: String
  },
  result: {
    type: Object
  },
  players: [
    {
      playerID: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      name: { type: String },
      image: { type: String }
    }
  ],
  scorer: [
    {
      id: {
        type: Number
      },
      scorer: {
        type: String
      },
      assist: {
        type: String
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
