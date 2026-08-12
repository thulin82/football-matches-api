import { describe, expect, it, vi, beforeEach } from "vitest";
import { matchService } from "./matchService.js";
import { Match } from "../models/Match.js";
import { ErrorResponse } from "../utils/errorResponse.js";

vi.mock("../models/Match.js", () => ({
  Match: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

describe("matchService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getMatches returns all matches", async () => {
    const matches = [{ name: "A" }, { name: "B" }];
    vi.mocked(Match.find).mockResolvedValue(matches as never);

    await expect(matchService.getMatches()).resolves.toEqual(matches);
  });

  it("getMatchById returns the match when found", async () => {
    const match = { name: "A" };
    vi.mocked(Match.findById).mockResolvedValue(match as never);

    await expect(matchService.getMatchById("1")).resolves.toEqual(match);
  });

  it("getMatchById throws ErrorResponse when not found", async () => {
    vi.mocked(Match.findById).mockResolvedValue(null as never);

    await expect(matchService.getMatchById("missing")).rejects.toMatchObject({
      statusCode: 404,
    } satisfies Partial<ErrorResponse>);
  });

  it("createMatch delegates to Match.create", async () => {
    const created = { name: "New" };
    vi.mocked(Match.create).mockResolvedValue(created as never);

    await expect(matchService.createMatch({ name: "New" })).resolves.toEqual(created);
    expect(Match.create).toHaveBeenCalledWith({ name: "New" });
  });

  it("updateMatch throws ErrorResponse when not found", async () => {
    vi.mocked(Match.findByIdAndUpdate).mockResolvedValue(null as never);

    await expect(matchService.updateMatch("missing", {})).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it("deleteMatch throws ErrorResponse when not found", async () => {
    vi.mocked(Match.findByIdAndDelete).mockResolvedValue(null as never);

    await expect(matchService.deleteMatch("missing")).rejects.toMatchObject({
      statusCode: 404,
    });
  });

  it("deleteMatch resolves when the match exists", async () => {
    vi.mocked(Match.findByIdAndDelete).mockResolvedValue({ name: "A" } as never);

    await expect(matchService.deleteMatch("1")).resolves.toBeUndefined();
  });
});
