const { body } = require("express-validator");

const signupValidator = [
  body("username").notEmpty().withMessage("Username is required").trim(),
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];
const loginValidator = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be 5 characters long"),
];
const resetValidator = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be 5 characters long"),
  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("Confirm Password must be 5 characters long"),
];
const updateValidators = [
  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty"),
  body("city").optional().trim().notEmpty().withMessage("City cannot be empty"),
  body("country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty"),
  body("username").notEmpty(),
];

const linkValidator = [
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be 5 characters long"),
  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("Confirm Password must be 5 characters long"),
];

module.exports = {
  signupValidator,
  loginValidator,
  resetValidator,
  updateValidators,
  linkValidator
};
