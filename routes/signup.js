const express = require("express");
const router = express.Router();
const signupController = require("../controller/signup.js");
const emailController = require("../controller/email.js");
const signupMiddleware = require("../middleware/signup.js");
const {signupValidator} = require("../validators/auth.js");
const {linkValidator} = require("../validators/auth.js");

router.post("/signup", ...signupValidator,signupMiddleware, signupController.signUp);
router.post("/forgotPassword", emailController.forgotPassword);
router.post("/reset-Password/:token", ...linkValidator,signupController.resetPassword )

module.exports = router;