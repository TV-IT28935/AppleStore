const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                },
                count: Number,
                color: String,
            },
        ],
        paymentIntent: {},
        orderStatus: {
            type: String,
            default: "Not processed",
            enum: [
                "Not processed",
                "Cash on Delivery",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Delivered",
            ],
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
const Order = mongoose.model("order", orderSchema);
module.exports = Order
