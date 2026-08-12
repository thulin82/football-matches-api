import mongoose from "mongoose";
import type { Env } from "./env.js";

/**
 * Connects to MongoDB using the given environment configuration.
 */
export async function connectDB(env: Env): Promise<typeof mongoose> {
  const conn = await mongoose.connect(env.MONGODB_URI);

  if (env.NODE_ENV === "development") {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }

  return conn;
}
