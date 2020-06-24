const express = require('express');
const {
    getMatch,
    getMatches,
    createMatch,
    updateMatch,
    deleteMatch
} = require('../controllers/matches');

const router = express.Router();

router
    .route('/')
    .get(getMatches)
    .post(createMatch);

router
    .route('/:id')
    .get(getMatch)
    .put(updateMatch)
    .delete(deleteMatch);

module.exports = router;