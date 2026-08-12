import type { Request, Response } from "express";
import { asyncHandler } from "../middleware/async.js";
import { matchService } from "../services/matchService.js";

// @desc    Get all matches
// @route   GET /api/v1/matches
// @access  Public
export const getMatches = asyncHandler(async (_req: Request, res: Response) => {
  const matches = await matchService.getMatches();

  res.status(200).json({ success: true, count: matches.length, data: matches });
});

// @desc    Get a single match
// @route   GET /api/v1/matches/:id
// @access  Public
export const getMatch = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const match = await matchService.getMatchById(req.params.id);

    res.status(200).json({ success: true, data: match });
  }
);

// @desc    Create new match
// @route   POST /api/v1/matches
// @access  Private
export const createMatch = asyncHandler(async (req: Request, res: Response) => {
  const match = await matchService.createMatch(req.body);

  res.status(201).json({ success: true, data: match });
});

// @desc    Update a match
// @route   PUT /api/v1/matches/:id
// @access  Private
export const updateMatch = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const match = await matchService.updateMatch(req.params.id, req.body);

    res.status(201).json({ success: true, data: match });
  }
);

// @desc    Delete a match
// @route   DELETE /api/v1/matches/:id
// @access  Private
export const deleteMatch = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    await matchService.deleteMatch(req.params.id);

    res.status(200).json({ success: true, data: {} });
  }
);
