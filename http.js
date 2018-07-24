'use strict';

// var http = require('http');

// var server = http.createServer(function (request, response) {
//     console.log(request.method + ':' + request.url);
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.end('<h1>Hello world!</h1>');
// });

// server.listen(8080);

// console.log('Server is running at http://127.0.0.1:8080/');



// var url = require('url');
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('path ' + pathname);
    var filepath = path.join(root, pathname);

    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            console.log('200' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else if (stats.isDirectory) {
            filepath = filepath.concat('index.html');
            fs.createReadStream(filepath).pipe(response);
        } 
        else {
            console.log('404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');