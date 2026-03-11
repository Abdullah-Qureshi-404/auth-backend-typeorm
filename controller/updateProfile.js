const { updateProfile } = require("../services/updateProfile.js");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, address, city, country } = req.body;

    const result = await updateProfile({
      userId,
      username,
      address,
      city,
      country,
    });
    return res
      .status(result.code)
      .json({ message: result.message, user: result.user });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(err.code).json({ message: err.message });
  }
};
