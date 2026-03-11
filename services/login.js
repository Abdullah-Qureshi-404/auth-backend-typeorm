const AppDataSource = require("../src/database/dataSource.js");
const { generateToken } = require("../utils/jwt.js");
const bcrypt = require("bcrypt");

exports.checkUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Both Email and password are required");
    }
    const userRepo = AppDataSource.getRepository("User");
    console.log("Searching for user with email:", email);

    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found with this email");
    }
    let result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Error("Invalid password");
    }
    const token = generateToken({ id: user.id, email: user.email });
    if (!token) {
      throw new Error("Token generation failed");
    }
    return {
      message: "User logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        token,
      },
    };
  } catch (err) {
    console.error("Error during login(services):", err);
    throw err;
  }
};

exports.resetPassword = async (
  email,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  try {
    if (!oldPassword || !newPassword || !confirmPassword) {
      throw new Error("All fields are required");
    }
    const userRepo = AppDataSource.getRepository("User");
    const user = await userRepo.findOne({ where: { email } });
    if (!user) throw new Error("User not found with this email");

    const correct = await bcrypt.compare(oldPassword, user.password);
    if (!correct) throw new Error("Old password is incorrect");

    if (newPassword !== confirmPassword)
      throw new Error("Passwords do not match");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await userRepo.save(user);
    
    return {
      message: "Password reset successfully",
      user: {
        id: user.id,
        username: user.username,
        email:email,
      },
    };
  } catch (err) {
    console.error("Error during password reset(services):", err);
    throw err;
  }
};
