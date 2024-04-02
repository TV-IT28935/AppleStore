const Category = require("../models/categoryModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
    const { title, products } = req.body;
    try {
        const newCategory = await Category.create({
            title: title,
            products: [...products],
        });
        return res.json(newCategory);
    } catch (error) {
        throw new Error(error.message);
    }
});

const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const allCategory = await Category.find({});
        return res.json(allCategory);
    } catch (error) {
        throw new Error(error.message);
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id)
    try {
        const category = await Category.findById(id).populate("products");
        return res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id)
    try {
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.json(updateCategory);
    } catch (error) {
        throw new Error(error.message);
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id)
    try {
        const deleteCategory = await Category.findByIdAndDelete(id, req.body);
        return res.json(deleteCategory);
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
