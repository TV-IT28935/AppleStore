const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const createOrder = asyncHandler(async (req, res) => {
    
});
const getOrder = asyncHandler(async (req, res) => {});
const getAllOrderUser = asyncHandler(async (req, res) => {});
const updateOrder = asyncHandler(async (req, res) => {});
const deleteOrder = asyncHandler(async (req, res) => {});
const getAllOrder = asyncHandler(async (req, res) => {});

module.exports = {
    createOrder,
    getOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
    getAllOrderUser,
};
