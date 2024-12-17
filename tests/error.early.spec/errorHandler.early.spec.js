/* eslint-disable no-undef */

import errorHandler from "../../middleware/error.js";

describe("errorHandler() errorHandler method", () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    // Happy Path Tests
    describe("Happy Paths", () => {
        it("should handle CastError and return 404 with appropriate message", () => {
            const err = { name: "CastError", value: "123" };
            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: "Resource not found with id of 123",
            });
        });

        it("should handle duplicate key error and return 400 with appropriate message", () => {
            const err = { code: 11000 };
            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: "Duplicate field value entered",
            });
        });

        it("should handle ValidationError and return 400 with appropriate message", () => {
            const err = {
                name: "ValidationError",
                errors: {
                    field1: { message: "Field1 is required" },
                    field2: { message: "Field2 must be a number" },
                },
            };
            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: "Field1 is required,Field2 must be a number",
            });
        });
    });

    // Edge Case Tests
    describe("Edge Cases", () => {
        it('should handle unknown error and return 500 with "Server Error" message', () => {
            const err = { message: "Unknown error" };
            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: "Unknown error",
            });
        });

        it('should handle error without message and return 500 with "Server Error" message', () => {
            const err = {};
            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: "Server Error",
            });
        });

        it("should handle error with no specific error type and return 500", () => {
            const err = {
                name: "SomeOtherError",
                message: "Some other error occurred",
            };
            errorHandler(err, req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: "Some other error occurred",
            });
        });
    });
});
