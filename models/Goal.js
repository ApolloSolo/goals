const { Schema, model } = require("mongoose");

const goalSchema = {
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  initialized: {
    type: Date,
    default: new Date(),
  },
};

const Goal = model("Goal", goalSchema);

module.exports = Goal;
