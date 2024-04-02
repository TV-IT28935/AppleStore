const express = require("express");
const {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishList,
    rating,
    uploadImages,
} = require("../controllers/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const { productImgResize, uploadPhoto } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", authMiddleware, getProduct);
router.post("/rating", authMiddleware, rating);
router.get("/", authMiddleware, getAllProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
);
module.exports = router;
