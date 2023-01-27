const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT | 3000;

let app = express(); // initialize express

app.use(express.json()); // this allows express to parse the contents of request bodies
app.use(morgan('dev')); // this logs all requests to the console

// TODO: express.static() on public directory

// cors settings, which allow the frontend to make requests to this backend. DO NOT MODIFY
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

// register your routes here
app.use('/', require('./api/routes/helloworld.routes'));

// TODO. app.use() to direct to frontend application

// listen on localhost:PORT (default localhost:3000)
app.listen(PORT, () => { console.log(`Listening on localhost:${PORT}...`); });