const express = require("express");
const {
    createOrder,
    getOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
    getAllOrderUser,
} = require("../controllers/orderController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createOrder);
router.get("/:id", authMiddleware, getOrder);
router.get("/order-user", authMiddleware, getAllOrderUser);
router.get("/", authMiddleware, isAdmin, getAllOrder);
router.put("/:id", authMiddleware, isAdmin, updateOrder);
router.delete("/:id", authMiddleware, isAdmin, deleteOrder);
module.exports = router;
