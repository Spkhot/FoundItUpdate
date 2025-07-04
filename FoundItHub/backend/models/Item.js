// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: String,
  location: { type: String, required: true },
  category: { type: String, enum: ["wallet", "id", "key", "documents", "shoes", "other"], required: true },
  contact: { type: String, required: true },
  imageUrl: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
