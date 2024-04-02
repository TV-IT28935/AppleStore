const express = require("express");
const {
    loginUser,
    logout,
    handleRefreshToken,
    changePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);
router.post("/logout", logout);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.get("/refresh-token", handleRefreshToken);
router.put("/password", authMiddleware, changePassword);

module.exports = router;
