const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const matches = require('./routes/matches');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/matches', matches);

const PORT = process.env.PORT || 6000;

app.listen(
    PORT,
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
