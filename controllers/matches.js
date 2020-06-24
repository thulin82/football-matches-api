const ErrorResponse = require('../utils/errorResponse');
const Match = require('../models/Match');

// @desc    Get all matches
// @route   GET /api/v1/matches
// @access  Public
exports.getMatches = async (req, res, next) => {
    try {
        const matches = await Match.find();
        res.status(200).json({ success: true, count: matches.length, data: matches });
    } catch (error) {
        next(error);
    }
};

// @desc    Get a single match
// @route   GET /api/v1/matches/:id
// @access  Public
exports.getMatch = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id);

        if (!match) {
            return next(new ErrorResponse(`Match not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: match });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new match
// @route   POST /api/v1/matches
// @access  Private
exports.createMatch = async (req, res, next) => {
    try {
        const match = await Match.create(req.body);
        res.status(201).json({ success: true, data: match });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a match
// @route   PUT /api/v1/matches/:id
// @access  Private
exports.updateMatch = async (req, res, next) => {
    try {
        const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!match) {
            return next(new ErrorResponse(`Match not found with id ${req.params.id}`, 404));
        }
        res.status(201).json({ success: true, data: match });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a match
// @route   DELETE /api/v1/matches/:id
// @access  Private
exports.deleteMatch = async (req, res, next) => {
    try {
        const match = await Match.findByIdAndDelete(req.params.id);

        if (!match) {
            return next(new ErrorResponse(`Match not found with id ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
