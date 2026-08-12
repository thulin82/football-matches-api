import { Match, type IMatch, type MatchDocument } from "../models/Match.js";
import { ErrorResponse } from "../utils/errorResponse.js";

/**
 * Business logic for matches, decoupled from Express so it can be unit tested
 * independently of req/res and mocked easily by the controller tests.
 */
export const matchService = {
  async getMatches(): Promise<MatchDocument[]> {
    return Match.find();
  },

  async getMatchById(id: string): Promise<MatchDocument> {
    const match = await Match.findById(id);

    if (!match) {
      throw new ErrorResponse(`Match not found with id ${id}`, 404);
    }

    return match;
  },

  async createMatch(data: Partial<IMatch>): Promise<MatchDocument> {
    return Match.create(data);
  },

  async updateMatch(id: string, data: Partial<IMatch>): Promise<MatchDocument> {
    const match = await Match.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!match) {
      throw new ErrorResponse(`Match not found with id ${id}`, 404);
    }

    return match;
  },

  async deleteMatch(id: string): Promise<void> {
    const match = await Match.findByIdAndDelete(id);

    if (!match) {
      throw new ErrorResponse(`Match not found with id ${id}`, 404);
    }
  },
};
