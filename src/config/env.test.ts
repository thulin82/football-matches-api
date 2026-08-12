import { describe, expect, it } from "vitest";
import { loadEnv } from "./env.js";

describe("loadEnv", () => {
  it("applies defaults and coerces PORT", () => {
    const env = loadEnv({ MONGODB_URI: "mongodb://localhost/test" });

    expect(env.NODE_ENV).toBe("development");
    expect(env.PORT).toBe(6000);
  });

  it("throws when MONGODB_URI is missing", () => {
    expect(() => loadEnv({})).toThrowError(/Invalid environment configuration/);
  });
});
