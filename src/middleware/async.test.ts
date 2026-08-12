import { describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./async.js";

describe("asyncHandler", () => {
  it("calls the wrapped function with req, res, next", async () => {
    const handler = vi.fn().mockResolvedValue(undefined);
    const wrapped = asyncHandler(handler);
    const req = {} as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    await wrapped(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards rejected promises to next()", async () => {
    const error = new Error("boom");
    const handler = vi.fn().mockRejectedValue(error);
    const wrapped = asyncHandler(handler);
    const next = vi.fn() as NextFunction;

    await wrapped({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
