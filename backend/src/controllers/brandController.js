const Brand = require("../models/brandModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
    const { title, ...rest } = req.body;
    try {
        const newBrand = await Brand.create({
            title: title,
            rest,
        });
        return res.json(newBrand);
    } catch (error) {
        throw new Error(error.message);
    }
});

const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const allBrand = await Brand.find({});
        return res.json(allBrand);
    } catch (error) {
        throw new Error(error.message);
    }
});

const getBrandById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const category = await Brand.findById(id).populate("categories");
        return res.json(category);
    } catch (error) {
        throw new Error(error.message);
    }
});

const updateBrand = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.json(updateBrand);
    } catch (error) {
        throw new Error(error.message);
    }
});

const deleteBrand = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const deleteBrand = await Brand.findByIdAndDelete(id, req.body);
        return res.json(deleteBrand);
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = {
    createBrand,
    getAllBrand,
    getBrandById,
    updateBrand,
    deleteBrand,
};
