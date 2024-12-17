import ErrorResponse from "../utils/errorResponse.js";

/**
 * Error handling middleware for Express.js that formats and sends error responses.
 * It captures different types of errors (CastError, ValidationError, duplicate keys)
 * and responds with appropriate status codes and messages.
 *
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 * @throws {Error} - Throws a formatted error response based on the error type.
 */
const errorHandler = (err, req, res) => {
    let error = { ...err };
    error.message = err.message;

    console.log(err.stack);

    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};

export default errorHandler;
