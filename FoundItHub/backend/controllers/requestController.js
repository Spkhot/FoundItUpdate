// controllers/requestController.js
const Request = require("../models/Request");
const { isEmailVerified } = require("./otpController");
const mongoose = require("mongoose");

// ✅ POST /api/requests - Create a new lost item request
exports.createRequest = async (req, res) => {
  const { productName, location, description, contact, category, reward, email } = req.body;

  if (!email || !(await isEmailVerified(email))) {
    return res.status(400).json({ success: false, message: "Email not verified" });
  }

  try {
    const newRequest = await Request.create({ productName, location, description, contact, category, reward, email });
    res.json({ success: true, message: "Request posted", request: newRequest });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to post request" });
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


