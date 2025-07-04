// controllers/otpController.js
const Otp = require("../models/Otp");
const sendOtpMail = require("../utils/sendEmail");

// ✅ POST /api/otp/send
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await Otp.deleteMany({ email }); // remove old OTPs
    await Otp.create({ email, otp: otpCode });
    await sendOtpMail(email, otpCode);

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// ✅ POST /api/otp/verify
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const existing = await Otp.findOne({ email, otp });
  if (!existing) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  await Otp.deleteMany({ email }); // OTP used once
  res.json({ success: true, message: "Email verified" });
};

// ✅ Function for controllers to check if email is verified
exports.isEmailVerified = async (email) => {
  const existing = await Otp.findOne({ email });
  return !existing; // if no OTP exists, email is verified
};
