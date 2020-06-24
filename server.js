const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env'});

const app = express();

app.get('/api/v1/matches', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: 'Show all matches'})
});

app.post('/api/v1/matches', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: 'Create new match'})
});

app.get('/api/v1/match/:id', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Show match ${req.params.id}`})
});

app.put('/api/v1/match/:id', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Update match ${req.params.id}`})
});

app.delete('/api/v1/match/:id', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete match ${req.params.id}`})
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`));