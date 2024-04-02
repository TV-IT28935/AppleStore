const express = require("express");
const {
    getAllBlog,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    likeBlog,
    disLikeBlog,
} = require("../controllers/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.get("/", authMiddleware, isAdmin, getAllBlog);
router.get("/:id", authMiddleware, getBlogById);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.post("/likes",authMiddleware, likeBlog);
router.post("/dislike",authMiddleware, disLikeBlog);


module.exports = router;
