import dotenv from "dotenv";
import { loadEnv } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { createApp } from "./app.js";

dotenv.config({ path: "./config/config.env" });

const env = loadEnv();

await connectDB(env);

const app = createApp(env);

const server = app.listen(env.PORT);

export { app, server };
