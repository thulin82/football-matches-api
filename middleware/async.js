/**
 * Wraps an asynchronous function to handle errors by passing them to the next middleware.
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Function} A middleware function that takes req, res, and next as parameters.
 * @throws {Error} Passes any error thrown by the wrapped function to the next middleware.
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
