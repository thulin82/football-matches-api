import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import Match from "../models/Match.js";

// @desc    Get all matches
// @route   GET /api/v1/matches
// @access  Public
export const getMatches = asyncHandler(async (req, res, next) => {
    const matches = await Match.find();

    res.status(200).json({
        success: true,
        count: matches.length,
        data: matches,
    });
});

// @desc    Get a single match
// @route   GET /api/v1/matches/:id
// @access  Public
export const getMatch = asyncHandler(async (req, res, next) => {
    const match = await Match.findById(req.params.id);

    if (!match) {
        return next(
            new ErrorResponse(`Match not found with id ${req.params.id}`, 404)
        );
    }

    res.status(200).json({ success: true, data: match });
});

// @desc    Create new match
// @route   POST /api/v1/matches
// @access  Private
export const createMatch = asyncHandler(async (req, res, next) => {
    const match = await Match.create(req.body);

    res.status(201).json({ success: true, data: match });
});

// @desc    Update a match
// @route   PUT /api/v1/matches/:id
// @access  Private
export const updateMatch = asyncHandler(async (req, res, next) => {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!match) {
        return next(
            new ErrorResponse(`Match not found with id ${req.params.id}`, 404)
        );
    }
    res.status(201).json({ success: true, data: match });
});

// @desc    Delete a match
// @route   DELETE /api/v1/matches/:id
// @access  Private
export const deleteMatch = asyncHandler(async (req, res, next) => {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
        return next(
            new ErrorResponse(`Match not found with id ${req.params.id}`, 404)
        );
    }

    res.status(200).json({ success: true, data: {} });
});
