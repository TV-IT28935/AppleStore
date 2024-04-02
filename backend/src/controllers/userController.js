const { genneralToken } = require("../config/jwtToken");
const { genneralRefreshToken } = require("../config/refreshToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");
const crypto = require("crypto");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
var uniqid = require("uniqid");

const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        return res.json(newUser);
    } else {
        throw new Error("User Already Exists");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = genneralRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(
            findUser?._id,
            {
                refreshToken: refreshToken,
            },
            {
                new: true,
            }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        return res.json({
            id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            accessToken: genneralToken(findUser?._id),
            // refreshToken: refreshToken,
        });
    } else {
        throw new Error("Invalid credentials");
    }
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") {
        throw new Error("Not Authorized");
    }
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = genneralRefreshToken(findAdmin?._id);
        await User.findByIdAndUpdate(
            findAdmin?._id,
            {
                refreshToken: refreshToken,
            },
            {
                new: true,
            }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        return res.json({
            id: findAdmin?._id,
            firstName: findAdmin?.firstName,
            lastName: findAdmin?.lastName,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            accessToken: genneralToken(findAdmin?._id),
            // refreshToken: refreshToken,
        });
    } else {
        throw new Error("Invalid credentials");
    }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    try {
        if (!cookie.refreshToken) {
            throw new Error("No refresh token in cookies");
        }
        const refreshToken = cookie.refreshToken;
        // if (refreshToken) {
        //     const decodedFromRefreshToken = await jwt.verify(
        //         refreshToken,
        //         process.env.JWT_SECRET
        //     );

        //     if (!decodedFromRefreshToken) {
        //         throw new Error(
        //             "No refresh token present in db or not matched"
        //         );
        //     }
        //     console.log(decodedFromRefreshToken);
        //     const accessToken = await jwt.sign(
        //         { id: decodedFromRefreshToken.id },
        //         process.env.JWT_SECRET,
        //         { expiresIn: "1d" }
        //     );
        //     return res.json({
        //         accessToken: accessToken,
        //     });
        // }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            throw new Error("Not refresh token present in db");
        }
        const accessToken = genneralToken(user._id);
        return res.json({
            accessToken: accessToken,
        });
    } catch (error) {
        throw new Error("Not Authorized token expired");
    }
});

// logout function
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie.refreshToken) {
        throw new Error("No refresh token in cookies");
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }

    await User.findOneAndUpdate(
        { refreshToken },
        {
            refreshToken: "",
        }
    );
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    return res.sendStatus(204);
});

// Get all users
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getAllUser = await User.find({});
        return res.json(getAllUser);
    } catch (error) {
        throw new Error(error.message);
    }
});

// Get user by id
const getUserById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const getUserById = await User.findById(id);
        console.log(id);
        if (getUserById) {
            return res.json(getUserById);
        } else {
            throw new Error("User is not Exists");
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// Delete user by id
const deleteUserById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params.id;
        validateMongoDbId(id);
        const deleteUserById = await User.findByIdAndDelete(id);
        if (deleteUserById) {
            return res.json(deleteUserById);
        } else {
            throw new Error("User is not Exists");
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// Update user by id
const UpdateUserById = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        validateMongoDbId(_id);
        const updateUserById = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        if (updateUserById) {
            await updateUserById.save();
            return res.json(updateUserById);
        } else {
            throw new Error("User is not Exists");
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true }
        );
        console.log(block);

        res.json({
            message: "User blocked",
            data: block,
        });
    } catch (error) {
        throw new Error(error.message);
    }
});

const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            { isBlocked: false },
            { new: true }
        );
        res.json({
            message: "User unblocked",
            data: unblock,
        });
    } catch (error) {
        throw new Error(error.message);
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.clearCookie("refreshToken");
        return res.json(updatedPassword);
    } else {
        return res.json(user);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("The user not found with this email");
    }
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 30 minutes from now 
        <a href="http://localhost:8000/v1/api/reset-password/${token}">Click Here</a>`;
        const data = {
            to: email,
            text: "Hey user",
            subject: "Forgot Password Link",
            html: resetURL,
        };
        sendEmail(data);
        return res.json(token);
    } catch (error) {
        throw new Error(error.message);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new Error("Token Expired , please try again later");
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findById(_id).populate("wishList");
        return res.json(user);
    } catch (error) {
        throw new Error(error.message);
    }
});

// save user address
const updateUserAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { address } = req.body;
    validateMongoDbId(_id);
    try {
        const updateUserAddress = await User.findByIdAndUpdate(
            _id,
            { address },
            {
                new: true,
            }
        );
        if (updateUserAddress) {
            await updateUserAddress.save();
            return res.json(updateUserAddress);
        } else {
            throw new Error("User is not Exists");
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

const addToCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { products } = req.body;
    // console.log(products);

    validateMongoDbId(_id);
    try {
        let productsArray = [];
        const user = await User.findById(_id);
        const alreadyExistCart = await Cart.findOne({ orderBy: user._id });
        console.log(alreadyExistCart);
        if (alreadyExistCart) {
            // for (let i = 0; i < alreadyExistCart.products.length; i++) {
            //     for (let j = 0; j < products.length; j++) {
            //         if (
            //             alreadyExistCart.products[i].product.toString() ===
            //             products[j]._id.toString()
            //         ) {
            //             const updateCart = await Cart.findByIdAndUpdate(
            //                 alreadyExistCart._id,
            //                 {
            //                     $inc: { count: products[j].count },
            //                 },
            //                 {
            //                     new: true,
            //                 }
            //             ).populate("products.product", "id title price");
            //             return res.json(updateCart);
            //         }
            //     }
            // }
            delete alreadyExistCart;
        }
        for (let i = 0; i < products.length; i++) {
            let object = {};
            object.product = products[i]._id;
            object.count = products[i].count;
            object.color = products[i].color;
            let getPrice = await Product.findById(products[i]._id)
                .select("price")
                .exec();
            object.price = getPrice.price;
            productsArray.push(object);
        }
        let cartTotal = 0;
        for (let i = 0; i < productsArray.length; i++) {
            cartTotal =
                cartTotal + productsArray[i].price * productsArray[i].count;
        }
        let newCart = await new Cart({
            products: productsArray,
            cartTotal,
            orderBy: user._id,
        });

        const cart123 = await newCart.populate(
            "products.product",
            "id title price"
        );
        await cart123.save();
        return res.json(cart123);
    } catch (error) {
        throw new Error(error.message);
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const cart = await Cart.find({ orderBy: _id }).populate(
            "products.product",
            "id title price"
        );
        res.json(cart);
    } catch (error) {
        throw new Error(error.message);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.deleteMany({ orderBy: user._id });
        return res.json(cart);
    } catch (error) {
        throw new Error(error.message);
    }
});

const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    try {
        const validCoupon = await Coupon.findOne({ name: coupon });
        if (validCoupon === null) {
            throw new Error("Invalid Coupon");
        }
        const user = await User.findOne({ _id });
        console.log(
            await Cart.findOne({
                orderBy: user._id,
            })
        );
        const cart = await Cart.findOne({
            orderBy: user._id,
        }).populate("products.product", "id title price");

        if (!cart) {
            throw new Error("Cart empty");
        }
        let { products, cartTotal } = cart;
        let totalAfterDiscount =
            cartTotal - ((cartTotal * validCoupon.discount) / 100).toFixed(2);

        const updatePriceCart = await Cart.findOneAndUpdate(
            { orderBy: user._id },
            {
                totalAfterDiscount,
            },
            {
                new: true,
            }
        );
        return res.json(updatePriceCart);
    } catch (error) {
        throw new Error(error.message);
    }
});

const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        if (!COD) {
            throw new Error("Create cash order failed!");
        }
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderBy: user._id }).populate(
            "products.product",
            "id title price"
        );
        let finalAmout = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmout = userCart.totalAfterDiscount;
        } else {
            finalAmout = userCart.cartTotal;
        }
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmout,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: "USD",
            },
            orderBy: user._id,
            orderStatus: "Cash on Delivery",
        }).save();
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: {
                        $inc: { quantity: -item.count, sold: +item.count },
                    },
                },
            };
        });
        const updated = await Product.bulkWrite(update, {});
        return res.json({
            message: "success",
        });
    } catch (error) {
        throw new Error(error.message);
    }
});

const getOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const userOrders = await Order.findOne({ orderBy: _id })
            .populate("products.product", "_id title price color")
            .exec();
        return res.json(userOrders);
    } catch (error) {
        throw new Error(error.message);
    }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    validateMongoDbId(id);
    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent: {
                    status: status,
                },
            },
            {
                new: true,
            }
        );
        return res.json(updateOrderStatus);
    } catch (error) {
        throw new Error(error.message);
    }
});
module.exports = {
    createUser,
    loginUser,
    loginAdmin,
    getAllUser,
    getUserById,
    deleteUserById,
    UpdateUserById,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logout,
    changePassword,
    forgotPasswordToken,
    resetPassword,
    getWishList,
    updateUserAddress,
    addToCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrder,
    updateOrderStatus,
};
