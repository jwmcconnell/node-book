var http = require('http');

function onRequest(req, res) {
  console.log("Request recieved on 4")
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello World");
  res.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started");