const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // ✅ Must be a valid Gmail
        pass: process.env.EMAIL_PASS,  // ✅ App Password only
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);  // ✅ Success log
  } catch (error) {
    console.error("❌ Error sending email:", error.message);  // 👈 Logs actual cause
    throw error; // Still throw so controller can respond with 500
  }
};

module.exports = sendEmail;
