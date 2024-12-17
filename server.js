import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middleware/error.js";
import connectDB from "./config/db.js";
import matches from "./routes/matches.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/matches", matches);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT);

export { app, server };
