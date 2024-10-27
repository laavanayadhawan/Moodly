const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", userModel);
