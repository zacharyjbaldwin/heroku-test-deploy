const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT | 5000;
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING || require('./config.json').MONGO_DB_CONNECTION_STRING;

let app = express(); // initialize express
app.use(express.json()); // this allows express to parse the contents of request bodies
app.use(morgan('dev')); // this logs all requests to the console (good for debugging)

// allow the www folder to be publicly accessed
app.use(express.static(path.join(__dirname, 'www')));

// cors settings, which allow the frontend to make requests to this backend. DO NOT MODIFY
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

// register your routes here
app.use('/api', require('./api/routes/helloworld.routes'));

// serve the frontend application if no routes match
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

// listen for requests
app.listen(PORT, () => { console.log(`Listening on localhost:${PORT}...`); });