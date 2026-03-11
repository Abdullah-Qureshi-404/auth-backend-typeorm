const jwt = require("jsonwebtoken");
const send = require("../services/email.js");
const AppDataSource = require("../src/database/dataSource.js");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userRepo = AppDataSource.getRepository("User");
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    await send.sendEmail(email, resetLink);
    return res.status(200).json({ message: "Reset password link sent." });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
