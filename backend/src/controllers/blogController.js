const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        return res.json({
            status: "success",
            data: newBlog,
        });
    } catch (error) {
        throw new Error(error.message);
    }
});

const getAllBlog = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate("likes");
        return res.json(blogs);
    } catch (error) {
        throw new Error(error.message);
    }
});
const getBlogById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const getBlog = await Blog.findById(id);
        const updateBlog = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 },
            },
            {
                new: true,
            }
        ).populate("likes");
        return res.json(updateBlog);
    } catch (error) {
        throw new Error(error.message);
    }
});
const updateBlog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.json(updateBlog);
    } catch (error) {
        throw new Error(error.message);
    }
});
const deleteBlog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        return res.json(deleteBlog);
    } catch (error) {
        throw new Error(error.message);
    }
});

const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongodbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // Find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find the user if he disliked the blog
    const alreadyDisliked = blog?.disLikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyDisliked) {
        // const blog = await Blog.findByIdAndUpdate(
        //     blogId,
        //     {
        //         $pull: { disLikes: loginUserId },
        //         isDisLiked: false,
        //         $push: { likes: loginUserId },
        //         isLiked: true,
        //     },
        //     {
        //         new: true,
        //     }
        // );

        const blog = await Blog.findById(blogId);
        blog.disLikes.pull(loginUserId);
        blog.isDisLiked = false;
        blog.likes.push(loginUserId);
        blog.isLiked = true;

        await blog.save();

        return res.json(blog);
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            {
                new: true,
            }
        );
        return res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push: { likes: loginUserId },
                isLiked: true,
            },
            {
                new: true,
            }
        );
        return res.json(blog);
    }
});

const disLikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongodbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // Find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisLiked;
    // find the user if he disliked the blog
    const alreadyliked = blog?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyliked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
                $push: { disLikes: loginUserId },
                isDisLiked: true,
            },
            {
                new: true,
            }
        );
        return res.json(blog);
    }
    if (isDisLiked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { disLikes: loginUserId },
                isDisLiked: false,
            },
            {
                new: true,
            }
        );
        return res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push: { disLikes: loginUserId },
                isDisLiked: true,
            },
            {
                new: true,
            }
        );
        return res.json(blog);
    }
});

module.exports = {
    createBlog,
    getAllBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    likeBlog,
    disLikeBlog,
};
