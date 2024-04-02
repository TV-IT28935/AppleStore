const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connection = async () => {
    const options = {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
    };
    await mongoose.connect(process.env.DB_HOST, options);
    console.log("Connection db successfully!");
};

module.exports = connection;
