const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                },
                count: Number,
                color: String,
                price: Number,
            },
        ],
        cartTotal: {
            type: Number,
        },
        totalAfterDiscount: {
            type: Number,
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
