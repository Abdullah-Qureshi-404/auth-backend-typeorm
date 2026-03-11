const { JsonWebTokenError } = require("jsonwebtoken");
const AppDataSource = require("../src/database/dataSource.js");
const { generateToken } = require("../utils/jwt.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

exports.registerUser = async function (username, email, password) {
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const userRepo = AppDataSource.getRepository("User");
    const userExists = await userRepo.findOne({ where: { email } });
    if (userExists) {
      throw new Error("User already exists with this email");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = userRepo.create({
      username,
      email,
      password: hashPassword,
    });
    await userRepo.save(newUser);
    const token = generateToken({ id: newUser.id });
    if (!token) {
      throw new Error("Token generation failed");
    }
    return {
      message: "User created (services)",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token,
      },
    };
  } catch (err) {
    console.error("Error during sign up(services):", err);
    throw err;
  }
};

exports.resetLink = async (token, password, confirmPassword) => {
  try {
    if (!token || !password || !confirmPassword) {
      throw new Error("All fields should be filled");
    }
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (!result) {
      throw new Error("Token is not correct");
    }
    if (password != confirmPassword) {
      throw new Error("Both Password should be same");
    }
    const userId = result.id;
    const userRepo = AppDataSource.getRepository("User");
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await userRepo.save(user);
    return {
      message: "Password Update successfully",
    };
  } catch (err) {
    console.error("Error during sign up(services):", err);
    throw err;
  }
};
