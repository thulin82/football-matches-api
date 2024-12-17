// Unit tests for: asyncHandler

import asyncHandler from "../../middleware/async.js";

describe("asyncHandler() asyncHandler method", () => {
    // Happy Path Tests
    describe("Happy Paths", () => {
        test("should call the passed function with req, res, and next", async () => {
            // Arrange
            const mockFn = jest.fn().mockResolvedValue("success");
            const req = {};
            const res = {};
            const next = jest.fn();

            // Act
            const handler = asyncHandler(mockFn);
            await handler(req, res, next);

            // Assert
            expect(mockFn).toHaveBeenCalledWith(req, res, next);
            expect(next).not.toHaveBeenCalled();
        });

        test("should handle resolved promises correctly", async () => {
            // Arrange
            const mockFn = jest.fn().mockResolvedValue("success");
            const req = {};
            const res = {};
            const next = jest.fn();

            // Act
            const handler = asyncHandler(mockFn);
            await handler(req, res, next);

            // Assert
            expect(next).not.toHaveBeenCalled();
        });
    });

    // Edge Case Tests
    describe("Edge Cases", () => {
        test("should pass errors to next when the function throws an error", async () => {
            // Arrange
            const error = new Error("Test error");
            const mockFn = jest.fn().mockRejectedValue(error);
            const req = {};
            const res = {};
            const next = jest.fn();

            // Act
            const handler = asyncHandler(mockFn);
            await handler(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });

        test("should handle functions that do not return a promise", async () => {
            // Arrange
            const mockFn = jest.fn(() => "not a promise");
            const req = {};
            const res = {};
            const next = jest.fn();

            // Act
            const handler = asyncHandler(mockFn);
            await handler(req, res, next);

            // Assert
            expect(next).not.toHaveBeenCalled();
        });

        test("should handle functions that return a rejected promise", async () => {
            // Arrange
            const error = new Error("Rejected promise");
            const mockFn = jest.fn().mockRejectedValue(error);
            const req = {};
            const res = {};
            const next = jest.fn();

            // Act
            const handler = asyncHandler(mockFn);
            await handler(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});

// End of unit tests for: asyncHandler
