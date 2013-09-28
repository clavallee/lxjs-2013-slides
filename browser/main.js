var shoe = require('shoe');
var term = require('exterminate')(80, 25);

var sock = shoe('/sock');
var muxDemux = require('mux-demux');

var mx = muxDemux();
sock.pipe(mx).pipe(sock);

var sh = mx.createStream({ command: [ 'bash', '-i' ], cwd: '/home' });
sh.write('clear\n');

term.pipe(sh).pipe(term);
term.appendTo(document.body);
term.listenTo(document);

function resize () {
    term.resize(window.innerWidth - 5, window.innerHeight - 2);
}
resize();
window.addEventListener('resize', resize);
