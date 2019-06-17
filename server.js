let http = require('http');
var url = require('url');

function start(route, handle) {
  function onRequest(req, res) {
    let pathname = url.parse(req.url).pathname;
    console.log(`Request for ${pathname} recieved`);

    route(handle, pathname);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World');
    res.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started');
}

exports.start = start;