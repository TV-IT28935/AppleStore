const asyncHandler = require("express-async-handler");
const Cart = require("../models/orderModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProducInCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const { _id } = req.user;
    try {

    } catch (error) {
        throw new Error(error.message);
    }
});
const getAllCartUser = asyncHandler(async (req, res) => {});
const updateCart = asyncHandler(async (req, res) => {});
const deleteCart = asyncHandler(async (req, res) => {});
const getAllCart = asyncHandler(async (req, res) => {});

module.exports = {
    createProducInCart,
    getAllCart,
    updateCart,
    deleteCart,
    getAllCartUser,
};
