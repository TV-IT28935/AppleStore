const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User = require("../models/userModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require("../utils/cloudinary");

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);

        res.json(newProduct);
    } catch (error) {
        throw new Error(error.message);
    }
});

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        return res.json(findProduct);
    } catch (error) {
        throw new Error(error.message);
    }
});

const getAllProduct = asyncHandler(async (req, res) => {
    try {
        // Filtering
        const queryObject = { ...req.query };
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );
        let query = Product.find(JSON.parse(queryString));

        // const products = await Product.find(req.query);

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // limiting the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) {
                throw new Error("This page does not exists");
            }
        }
        const products = await query;
        return res.json(products);
    } catch (error) {
        throw new Error(error.message);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.json(updateProduct);
    } catch (error) {
        throw new Error(error.message);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        if (deleteProduct) {
            return res.json(deleteProduct);
        } else {
            throw new Error("User is not Exists");
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

const addToWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishList.find(
            (id) => id.toString() === productId.toString()
        );

        if (alreadyAdded) {
            const user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishList: productId },
                },
                {
                    new: true,
                }
            );

            return res.json(user);
        } else {
            const user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishList: productId },
                },
                {
                    new: true,
                }
            );

            return res.json(user);
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, productId } = req.body;
    try {
        const product = await Product.findById(productId);
        let alreadyRated = product.ratings.find((user) => {
            return user.postedBy.toString() === _id.toString();
        });

        if (alreadyRated) {
            await Product.updateOne(
                {
                    // $elemMatch: tìm phần tử đầu tiên có _id : alreadyRated._id
                    // trong ratings array
                    ratings: { $elemMatch: { _id: alreadyRated._id } },
                },
                {
                    $set: {
                        "ratings.$.star": star,
                        "ratings.$.comment": comment,
                    },
                }
            );
        } else {
            await Product.findByIdAndUpdate(
                productId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedBy: _id,
                        },
                    },
                },
                { new: true }
            );
        }

        const getAllRatings = await Product.findById(productId);
        const averageRating = (
            getAllRatings.ratings.reduce((acc, curr) => {
                return acc + curr.star;
            }, 0) / getAllRatings.ratings.length
        ).toFixed(1);

        const updateProduct = await Product.findByIdAndUpdate(
            productId,
            {
                totalRating: averageRating,
            },
            {
                new: true,
            }
        );
        return res.json(updateProduct);
    } catch (error) {
        throw new Error(error.message);
    }
});

const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
        }

        const findProduct = await Product.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => file),
            },
            {
                new: true,
            }
        );
        return res.json(findProduct)
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishList,
    rating,
    uploadImages,
};
