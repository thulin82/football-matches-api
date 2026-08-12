import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";
import { matchService } from "./services/matchService.js";
import { ErrorResponse } from "./utils/errorResponse.js";

vi.mock("./services/matchService.js", () => ({
  matchService: {
    getMatches: vi.fn(),
    getMatchById: vi.fn(),
    createMatch: vi.fn(),
    updateMatch: vi.fn(),
    deleteMatch: vi.fn(),
  },
}));

describe("app", () => {
  const app = createApp({ NODE_ENV: "test" });

  it("GET /api/v1/matches returns 200 and json", async () => {
    vi.mocked(matchService.getMatches).mockResolvedValue([]);

    const response = await request(app).get("/api/v1/matches");

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ success: true, count: 0, data: [] });
  });

  it("GET /api/v1/matches/:id returns 404 for an unknown match", async () => {
    vi.mocked(matchService.getMatchById).mockRejectedValue(
      new ErrorResponse("Match not found with id 1", 404)
    );

    const response = await request(app).get("/api/v1/matches/1");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      error: "Match not found with id 1",
    });
  });
});
