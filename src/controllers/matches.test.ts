import { describe, expect, it, vi, beforeEach } from "vitest";
import type { Request, Response } from "express";
import {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
} from "./matches.js";
import { matchService } from "../services/matchService.js";

vi.mock("../services/matchService.js", () => ({
  matchService: {
    getMatches: vi.fn(),
    getMatchById: vi.fn(),
    createMatch: vi.fn(),
    updateMatch: vi.fn(),
    deleteMatch: vi.fn(),
  },
}));

function mockRes() {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("matches controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getMatches responds with the list and count", async () => {
    const matches = [{ name: "A" }, { name: "B" }];
    vi.mocked(matchService.getMatches).mockResolvedValue(matches as never);
    const res = mockRes();

    await getMatches({} as Request, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, count: 2, data: matches });
  });

  it("getMatch responds with a single match", async () => {
    const match = { name: "A" };
    vi.mocked(matchService.getMatchById).mockResolvedValue(match as never);
    const res = mockRes();
    const req = { params: { id: "1" } } as unknown as Request<{ id: string }>;

    await getMatch(req, res, vi.fn());

    expect(matchService.getMatchById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: match });
  });

  it("createMatch responds with 201 and the created match", async () => {
    const created = { name: "New" };
    vi.mocked(matchService.createMatch).mockResolvedValue(created as never);
    const res = mockRes();
    const req = { body: { name: "New" } } as Request;

    await createMatch(req, res, vi.fn());

    expect(matchService.createMatch).toHaveBeenCalledWith({ name: "New" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: created });
  });

  it("updateMatch responds with the updated match", async () => {
    const updated = { name: "Updated" };
    vi.mocked(matchService.updateMatch).mockResolvedValue(updated as never);
    const res = mockRes();
    const req = { params: { id: "1" }, body: { name: "Updated" } } as unknown as Request<{
      id: string;
    }>;

    await updateMatch(req, res, vi.fn());

    expect(matchService.updateMatch).toHaveBeenCalledWith("1", { name: "Updated" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: updated });
  });

  it("deleteMatch responds with an empty payload", async () => {
    vi.mocked(matchService.deleteMatch).mockResolvedValue(undefined);
    const res = mockRes();
    const req = { params: { id: "1" } } as unknown as Request<{ id: string }>;

    await deleteMatch(req, res, vi.fn());

    expect(matchService.deleteMatch).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: {} });
  });
});
