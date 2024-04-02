const express = require("express");
const {
    createProducInCart,
    getAllCart,
    updateCart,
    deleteCart,
    getAllCartUser,
} = require("../controllers/cartController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, createProducInCart);
router.get("/order-user", authMiddleware, getAllCartUser);
router.get("/", authMiddleware, isAdmin, getAllCart);
router.put("/:id", authMiddleware, isAdmin, updateCart);
router.delete("/:id", authMiddleware, isAdmin, deleteCart);
module.exports = router;
