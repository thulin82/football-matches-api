import mongoose from "mongoose";

/**
 * Asynchronously connects to the MongoDB database using the URI from environment variables.
 * Logs the connection host if the environment is set to development.
 *
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 * @throws {Error} Throws an error if the connection to MongoDB fails.
 */
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (process.env.NODE_ENV === "development") {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
};

export default connectDB;
