const http = require('http');

const server = http.createServer((req, res) => {
    
    res.setHeader('Contet-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page </title></head>');
    res.write('<body><h1>Hello from my nodejs Server </h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);