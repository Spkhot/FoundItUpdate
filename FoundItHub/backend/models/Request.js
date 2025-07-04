// models/Request.js
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: String,
  location: { type: String, required: true },
  category: { type: String, enum: ["wallet", "id", "key", "documents", "shoes", "other"], required: true },
  reward: String,
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", requestSchema);
