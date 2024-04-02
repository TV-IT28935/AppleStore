const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    },
    {
        timestamps: true,
    }
);

//Export the model
const Category = mongoose.model("category", categorySchema);
module.exports = Category;
