const { checkUser, resetPassword } = require("../services/login.js");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await checkUser(email, password);
        return res.status(200).json(user);
    }
    catch (err) {
        console.error("Login Error: ", err);
        return res.status(500).json({ error: err.message });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const email = req.user.email;
        const  {oldPassword, newPassword, confirmPassword } = req.body;
        const result = await resetPassword(email, oldPassword, newPassword, confirmPassword);
        return res.status(200).json(result);
    }
    catch (err) {
        console.error("Reset Password Error: ", err);
        return res.status(500).json({ error: err.message });
    }
}
exports.logout = async(req,res) => {
    try{
        const token = req.body.user.token;
        

    }
    catch{

    }
}