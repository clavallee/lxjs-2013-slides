var http = require('http');
var fs = require('fs');
var marked = require('marked');
var shoe = require('shoe');
var shux = require('shux')();
var muxDemux = require('mux-demux');
var clear = new Buffer([ 0x1b, 0x5b, 0x48, 0x1b, 0x5b, 0x32, 0x4a ]);

var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(function (req, res) {
    if (req.url === '/slides') {
        var ondata = function (err, src) {
            if (err) return res.end(err + '\n');
            res.setHeader('content-type', 'text/html');
            res.end(marked(src))
        };
        fs.readFile(__dirname + '/readme.markdown', 'utf8', ondata);
        return;
    }
    
    if (/^\/static\//.test(req.url)) {
        req.url = req.url.replace(/^\/static/, '');
    }
    ecstatic(req, res);
});
server.listen(8000, '127.0.0.1');

var sock = shoe(function (stream) {
    stream.pipe(muxDemux(function (mstream) {
        mstream.pipe(shux.createShell(mstream.meta)).pipe(mstream);
    })).pipe(stream);
});
sock.install(server, '/sock');
