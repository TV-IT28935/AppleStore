const jwt = require("jsonwebtoken");
require("dotenv").config();
const genneralToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { genneralToken };
