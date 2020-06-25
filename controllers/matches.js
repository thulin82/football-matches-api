/* eslint-disable no-unused-vars */
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Match = require('../models/Match');

// @desc    Get all matches
// @route   GET /api/v1/matches
// @access  Public
exports.getMatches = asyncHandler(async (req, res, next) => {
    const matches = await Match.find();

    res.status(200).json({ success: true, count: matches.length, data: matches });
});

// @desc    Get a single match
// @route   GET /api/v1/matches/:id
// @access  Public
exports.getMatch = asyncHandler(async (req, res, next) => {
    const match = await Match.findById(req.params.id);

    if (!match) {
        return next(new ErrorResponse(`Match not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: match });
});

// @desc    Create new match
// @route   POST /api/v1/matches
// @access  Private
exports.createMatch = asyncHandler(async (req, res, next) => {
    const match = await Match.create(req.body);

    res.status(201).json({ success: true, data: match });
});

// @desc    Update a match
// @route   PUT /api/v1/matches/:id
// @access  Private
exports.updateMatch = asyncHandler(async (req, res, next) => {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!match) {
        return next(new ErrorResponse(`Match not found with id ${req.params.id}`, 404));
    }
    res.status(201).json({ success: true, data: match });
});

// @desc    Delete a match
// @route   DELETE /api/v1/matches/:id
// @access  Private
exports.deleteMatch = asyncHandler(async (req, res, next) => {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
        return next(new ErrorResponse(`Match not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: {} });
});
