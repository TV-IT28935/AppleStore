const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token = "";
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        if (req.headers.authorization) {
            // const token = req.cookies.refreshToken;
            token = req.headers.authorization.split(" ")[1];
            try {
                if (token) {
                    const decodedUser = jwt.verify(
                        token,
                        process.env.JWT_SECRET
                    );
                    const user = await User.findById(decodedUser?.id);
                    req.user = user;
                    next();
                }
            } catch (error) {
                throw new Error("Not Authorized token expired");
            }
        } else {
            throw new Error("There is no token attached to header");
        }
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email, role } = req.user;
    // const adminUser = await User.findOne({ email });
    if (role !== "admin") {
        throw new Error("You are note an admin");
    } else {
        next();
    }
});
module.exports = { authMiddleware, isAdmin };
