import { describe, expect, it } from "vitest";
import { ErrorResponse } from "./errorResponse.js";

describe("ErrorResponse", () => {
  it("sets message and statusCode", () => {
    const error = new ErrorResponse("Not found", 404);

    expect(error.message).toBe("Not found");
    expect(error.statusCode).toBe(404);
    expect(error).toBeInstanceOf(Error);
  });
});
