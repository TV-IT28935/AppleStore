const mongoose = require("mongoose"); // Erase if already required

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
});

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: categorySchema,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        color: {
            type: String,
            required: true,
        },
        ratings: [
            {
                star: Number,
                comment: String,
                postedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                },
            },
        ],
        totalRating: {
            type: Number,
            default: 0,
        },

        
    },
    {
        timestamps: true,
    }
);

//Export the model
const Product = mongoose.model("product", userSchema);
module.exports = Product;
