const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getCouponById } = require("../controllers/couponController");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.get("/:id", authMiddleware, getCouponById);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router;
