/* eslint-disable no-unused-vars */
// @desc    Get all matches
// @route   GET /api/v1/matches
// @access  Public
exports.getMatches = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all matches'});
};

// @desc    Get a single match
// @route   GET /api/v1/matches/:id
// @access  Public
exports.getMatch = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Show match ${req.params.id}`});
};

// @desc    Create new match
// @route   POST /api/v1/matches
// @access  Private
exports.createMatch = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create match'});
};

// @desc    Update a match
// @route   PUT /api/v1/matches/:id
// @access  Private
exports.updateMatch = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update match ${req.params.id}`});
};

// @desc    Delete a match
// @route   DELETE /api/v1/matches/:id
// @access  Private
exports.deleteMatch = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete match ${req.params.id}`});
};
