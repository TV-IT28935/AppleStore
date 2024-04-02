const express = require("express");
const {
    createUser,
    getAllUser,
    getUserById,
    deleteUserById,
    UpdateUserById,
    blockUser,
    unBlockUser,
    getWishList,
    updateUserAddress,
    addToCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrder,
    updateOrderStatus,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/register", createUser);
router.get("/", authMiddleware, isAdmin, getAllUser);
router.get("/wishlist", authMiddleware, getWishList);

router.put("/save-address", authMiddleware, updateUserAddress);

router.post("/cart", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getUserCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.post("/apply-coupon", authMiddleware, applyCoupon);

router.post("/cash-order", authMiddleware, createOrder);
router.get("/get-order", authMiddleware, getOrder);
router.put("/update-order/:id", authMiddleware,isAdmin, updateOrderStatus);


router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", authMiddleware, isAdmin, deleteUserById);
router.put("/", authMiddleware, UpdateUserById);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
