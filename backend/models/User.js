const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password_hash: String,
  location: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);