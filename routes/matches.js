const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: 'Show all matches'})
});

router.post('/', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: 'Create new match'})
});

router.get('/:id', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Show match ${req.params.id}`})
});

router.put('/:id', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Update match ${req.params.id}`})
});

router.delete('/:id', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete match ${req.params.id}`})
});

module.exports = router;