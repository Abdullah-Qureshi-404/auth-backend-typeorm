const { registerUser, resetLink } = require("../services/signup.js");

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await registerUser(username, email, password);
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error during sign up:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const token = req.params.token;
    const result = await resetLink(token, password, confirmPassword);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error during reseting Paassword through link:", err);
    return res.status(400).json({ error: err.message });
  }
};
