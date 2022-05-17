var http = require('http');

http.createServer((req, res) =>{
     res.writeHead(200, {'ContentType': 'text/html'});
     res.end('Hello World from Node JS!!')
}).listen(5001);

