require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./src/config/dbConnect");
const userRouter = require("./src/routes/userRoute");
const productRouter = require("./src/routes/productRoute");
const authRouter = require("./src/routes/authRoute");
const blogRouter = require("./src/routes/blogRoute");
const categoryRouter = require("./src/routes/categoryRoute");
const brandRouter = require("./src/routes/brandRoute");
const couponRouter = require("./src/routes/couponRoute");
const orderRouter = require("./src/routes/orderRoute");
const { notFound, errorHandler } = require("./src/middlewares/errorHandler");

const PORT = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/v1/api/", authRouter);
app.use("/v1/api/user", userRouter);
app.use("/v1/api/product", productRouter);
app.use("/v1/api/blog", blogRouter);
app.use("/v1/api/category", categoryRouter);
app.use("/v1/api/brand", brandRouter);
app.use("/v1/api/coupon", couponRouter);
app.use("/v1/api/order", orderRouter);


app.use(notFound);
app.use(errorHandler);

(async () => {
    try {
        app.listen(PORT, () => {
            console.log("Server is running at PORT", PORT);
        });
        await dbConnect();
    } catch (error) {
        throw new Error(error.message);
    }
})();
