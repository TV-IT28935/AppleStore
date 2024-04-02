const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
var userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: "user",
        },
        cart: {
            type: Array,
            default: [],
        },
        address: {
            type: String,
        },
        wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
        order: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
        refreshToken: {
            type: String,
        },
        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        // shippingAddress: {
        //     type: String,
        // },
        // billingAddress: {
        //     type: String,
        // },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (req, res, next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.isPasswordMatched = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
