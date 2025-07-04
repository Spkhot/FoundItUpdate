// controllers/requestController.js
const Request = require("../models/Request");
const { isEmailVerified } = require("./otpController");
const mongoose = require("mongoose");

// ✅ POST /api/requests - Create a new lost item request
exports.createRequest = async (req, res) => {
  const { productName, description, location, category, reward, email, contact } = req.body;

  if (!email || !(await isEmailVerified(email))) {
    return res.status(400).json({ success: false, message: "Email not verified" });
  }

  try {
    const request = await Request.create({
      productName,
      description,
      location,
      category,
      reward,
      email,
      contact, // ✅ Add this
    });

    res.status(201).json({ success: true, message: "Request submitted", request });
  } catch (err) {
    console.error("❌ Error saving request:", err);
    res.status(500).json({ success: false, message: "Failed to submit request" });
  }
};


// ✅ GET /api/requests - Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching requests" });
  }
};

// controllers/requestController.js


exports.deleteRequest = async (req, res) => {
  const { id } = req.params;

  // 🛡️ Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid request ID" });
  }

  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    await Request.findByIdAndDelete(id);
    res.json({ success: true, message: "Request deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


