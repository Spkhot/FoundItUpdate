const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  productName: String,
  description: String,
  location: String,
  category: String,
  reward: String,
  email: String,
  contact: String, // ✅ This must be defined
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
