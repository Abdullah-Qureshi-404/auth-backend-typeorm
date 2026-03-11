const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

function generateToken(payload) {
  try {
    if (!payload || !process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      throw new Error("Invalid payload or environment variables");
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (err) {
    console.error("Error generating token:", err);
     throw new Error("Token generation failed"); 
  }
}

module.exports = {
  generateToken,
};




 