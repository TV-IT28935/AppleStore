const express = require("express");
const {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
