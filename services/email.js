const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (email, resetLink) => {
  const mailOption = {
    from: `"Abdullah Qureshi"`,
    to: email,
    subject: "Reset Your Password",
    html: `<p>You want to reset your password.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hours.</p>`,
  };
  await transporter.sendMail(mailOption);
};
