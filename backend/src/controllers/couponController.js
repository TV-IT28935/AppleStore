const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        return res.json(newCoupon);
    } catch (error) {
        throw new Error(error.message);
    }
});
const getAllCoupon = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find({});
        return res.json(coupons);
    } catch (error) {
        throw new Error(error.message);
    }
});
const getCouponById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const couponById = await Coupon.findById(id);
        return res.json(couponById);
    } catch (error) {
        throw new Error(error.message);
    }
});
const updateCoupon = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.json(updateCoupon);
    } catch (error) {
        throw new Error(error.message);
    }
});
const deleteCoupon = asyncHandler(async (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        return res.json(deleteCoupon);
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = {
    createCoupon,
    getAllCoupon,
    getCouponById,
    updateCoupon,
    deleteCoupon,
};
