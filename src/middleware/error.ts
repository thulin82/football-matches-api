import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ErrorResponse } from "../utils/errorResponse.js";

interface MongoServerError extends Error {
  code?: number;
}

/**
 * Formats known Mongoose/Mongo errors into consistent HTTP error responses.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  let error: ErrorResponse | Error = err;

  console.error(err.stack);

  if (err instanceof mongoose.Error.CastError) {
    error = new ErrorResponse(`Resource not found with id of ${err.value}`, 404);
  }

  if ((err as MongoServerError).code === 11000) {
    error = new ErrorResponse("Duplicate field value entered", 400);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  const statusCode = error instanceof ErrorResponse ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: error.message || "Server Error",
  });
}
