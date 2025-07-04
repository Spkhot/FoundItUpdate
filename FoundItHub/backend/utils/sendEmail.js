const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  // 🛠 Gmail config OR use Mailtrap for dev
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,      // e.g. your@gmail.com
      pass: process.env.EMAIL_PASS,      // app password (not regular password)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
