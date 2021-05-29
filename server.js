const { createServer } = require('http'),
      { readFile } = require('fs'),
      port = 3333

function onRequest(req, res) {
    readFile('index.html', 'utf8', function(err, data) {
        if (err) {
            res.statusCode = 500
            res.end('unable to read file')
        }
        else
            res.end(data)
    })
}

createServer(onRequest).listen(port)

console.log('server is ready to accept connections on port', port)
