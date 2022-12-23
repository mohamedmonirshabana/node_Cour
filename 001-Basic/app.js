const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("In The Middlewa!");
    next();
});

app.use((req, res, next) => {
    console.log("In Another The Middlewa!");
    res.send('<h1>Hello From Express </h1>')
});

const server = http.createServer(app);

server.listen(3000);