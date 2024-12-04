import mongoose from "mongoose";

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    if (process.env.NODE_ENV === "development") {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
};

export default connectDB;
