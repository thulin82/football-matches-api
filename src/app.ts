import express from "express";
import cors from "cors";
import morgan from "morgan";
import matches from "./routes/matches.js";
import { errorHandler } from "./middleware/error.js";
import type { Env } from "./config/env.js";

/**
 * Builds the Express app. Kept separate from server.ts so it can be
 * imported in tests without opening a real DB connection or port.
 */
export function createApp(env: Pick<Env, "NODE_ENV">) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use("/api/v1/matches", matches);

  app.use(errorHandler);

  return app;
}
