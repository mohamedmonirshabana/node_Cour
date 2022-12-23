const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("In The Middlewa!");
    next();
});

app.use((req, res, next) => {
    console.log("In Another The Middlewa!");
});

const server = http.createServer(app);

server.listen(3000);