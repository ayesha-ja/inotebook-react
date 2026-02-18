const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const note = mongoose.model("Note", noteSchema);
module.exports = note;
