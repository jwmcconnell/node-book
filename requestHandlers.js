let querystring = require('querystring');
let fs = require('fs');
let formidable = require('formidable');

function start(res, req) {
  console.log("Request handler 'start' was called");

  let body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" />' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log("Request handler 'upload' was called.");

  let form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, (error, fields, files) => {
    console.log('parsing done');

    fs.rename(files.upload.path, '/tmp/test.png', (error) => {
      if (error) {
        console.log('error')
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, '/tmp/test.png');
      }
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`recieved image:<br/>`);
    res.write(`<img src='/show' />`)
    res.end();
  });
}

function show(res) {
  console.log("Request handler 'show' was called");
  res.writeHead(200, { 'Content-Type': 'image/png' });
  fs.createReadStream('/tmp/test.png').pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;