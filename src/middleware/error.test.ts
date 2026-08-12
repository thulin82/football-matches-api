import { describe, expect, it, vi } from "vitest";
import mongoose from "mongoose";
import type { Request, Response } from "express";
import { errorHandler } from "./error.js";
import { ErrorResponse } from "../utils/errorResponse.js";

function mockRes() {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("errorHandler", () => {
  it("responds with statusCode from ErrorResponse", () => {
    const res = mockRes();
    errorHandler(new ErrorResponse("Not found", 404), {} as Request, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: "Not found" });
  });

  it("maps mongoose CastError to a 404", () => {
    const res = mockRes();
    const castError = new mongoose.Error.CastError("ObjectId", "abc", "id");

    errorHandler(castError, {} as Request, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Resource not found with id of abc",
    });
  });

  it("maps duplicate key errors to a 400", () => {
    const res = mockRes();
    const dupError = Object.assign(new Error("dup"), { code: 11000 });

    errorHandler(dupError, {} as Request, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Duplicate field value entered",
    });
  });

  it("defaults to a 500 for unknown errors", () => {
    const res = mockRes();
    errorHandler(new Error("boom"), {} as Request, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: "boom" });
  });
});
