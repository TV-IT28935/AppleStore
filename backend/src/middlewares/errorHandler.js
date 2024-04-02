const notFound = async (req, res, next) => {
    const error = new Error(`Not Found: ,${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = async (req, res, next) => {
    const statusCode = res.statusCode == 200 ? 400 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err?.message,
        stack: err?.stack,
    });
};

module.exports = { notFound, errorHandler };
