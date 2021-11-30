const mongoose = require("mongoose");

const task = new mongoose.Schema({
  task: { type: String },
  isDel: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Task", task);
