/* eslint-disable no-undef */

import mongoose from "mongoose";
import connectDB from "../../config/db.js";

jest.mock("mongoose", () => ({
    connect: jest.fn(),
}));

describe("connectDB() connectDB method", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Happy paths", () => {
        it("should connect to the database successfully in development mode", async () => {
            // Arrange
            const mockConnection = { connection: { host: "localhost" } };
            mongoose.connect.mockResolvedValue(mockConnection);
            process.env.NODE_ENV = "development";
            process.env.MONGODB_URI = "mongodb://localhost:27017/testdb";
            const consoleLogSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});

            // Act
            await connectDB();

            // Assert
            expect(mongoose.connect).toHaveBeenCalledWith(
                process.env.MONGODB_URI
            );
            expect(consoleLogSpy).toHaveBeenCalledWith(
                "MongoDB Connected: localhost"
            );

            // Cleanup
            consoleLogSpy.mockRestore();
        });

        it("should connect to the database successfully in production mode", async () => {
            // Arrange
            const mockConnection = { connection: { host: "localhost" } };
            mongoose.connect.mockResolvedValue(mockConnection);
            process.env.NODE_ENV = "production";
            process.env.MONGODB_URI = "mongodb://localhost:27017/testdb";

            // Act
            await connectDB();

            // Assert
            expect(mongoose.connect).toHaveBeenCalledWith(
                process.env.MONGODB_URI
            );
        });
    });

    describe("Edge cases", () => {
        it("should throw an error if the connection fails", async () => {
            // Arrange
            const errorMessage = "Connection failed";
            mongoose.connect.mockRejectedValue(new Error(errorMessage));
            process.env.MONGODB_URI = "mongodb://localhost:27017/testdb";

            // Act & Assert
            await expect(connectDB()).rejects.toThrow(errorMessage);
        });

        it("should not log the connection host if NODE_ENV is not development", async () => {
            // Arrange
            const mockConnection = { connection: { host: "localhost" } };
            mongoose.connect.mockResolvedValue(mockConnection);
            process.env.NODE_ENV = "test";
            process.env.MONGODB_URI = "mongodb://localhost:27017/testdb";
            const consoleLogSpy = jest
                .spyOn(console, "log")
                .mockImplementation(() => {});

            // Act
            await connectDB();

            // Assert
            expect(consoleLogSpy).not.toHaveBeenCalled();

            // Cleanup
            consoleLogSpy.mockRestore();
        });
    });
});
