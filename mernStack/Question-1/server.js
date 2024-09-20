const http = require('http');

const port = 3000;

//creating server
const server = http.createServer((req,resp)=>{
    resp.writeHead(200, {'Content-Type':'text/plain'});
    resp.end('Hello, World!');
});

//server is listening on port 3000
server.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});