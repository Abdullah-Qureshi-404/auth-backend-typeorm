const express = require("express");
const router = express.Router();
const loginController = require("../controller/login.js");
const updateProfileController = require("../controller/updateProfile.js");
const loginMiddlleware = require("../middleware/signup.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const {loginValidator, resetValidator,updateValidators} = require("../validators/auth.js");

router.post("/login", ...loginValidator, loginMiddlleware, loginController.login);
router.post("/login/resetPassword", ...resetValidator,authMiddleware,loginController.resetPassword);
router.post("/login/updateProfile", ...updateValidators,authMiddleware,updateProfileController.updateProfile);
module.exports = router;